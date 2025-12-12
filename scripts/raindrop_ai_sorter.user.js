// ==UserScript==
// @name         Raindrop.io AI Sorter
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Scrapes Raindrop.io bookmarks, tags them using AI, and organizes them into collections.
// @author       You
// @match        https://app.raindrop.io/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Application State
    const STATE = {
        isRunning: false,
        stopRequested: false,
        log: [],
        config: {
            openaiKey: GM_getValue('openaiKey', ''),
            anthropicKey: GM_getValue('anthropicKey', ''),
            raindropToken: GM_getValue('raindropToken', ''),
            provider: GM_getValue('provider', 'openai'), // 'openai', 'anthropic', or 'custom'
            customBaseUrl: GM_getValue('customBaseUrl', 'http://localhost:11434/v1'),
            customModel: GM_getValue('customModel', 'llama3'),
            model: GM_getValue('model', 'gpt-3.5-turbo'),
            concurrency: 3,
            targetCollectionId: 0, // 0 is 'All bookmarks'
            skipTagged: false,
            dryRun: false,
            taggingPrompt: GM_getValue('taggingPrompt', ''),
            clusteringPrompt: GM_getValue('clusteringPrompt', ''),
            ignoredTags: GM_getValue('ignoredTags', ''),
            autoDescribe: false,
            descriptionPrompt: GM_getValue('descriptionPrompt', ''),
            nestedCollections: false
        }
    };

    console.log('Raindrop.io AI Sorter loaded');

    // UI Styles
    GM_addStyle(`
        #ras-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 350px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            display: none;
            max-height: 80vh;
            display: flex;
            flex-direction: column;
        }
        #ras-container.minimized {
            width: auto;
            height: auto;
            background: transparent;
            border: none;
            box-shadow: none;
        }
        #ras-header {
            padding: 12px;
            background: #f5f5f5;
            border-bottom: 1px solid #ddd;
            border-radius: 8px 8px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            font-weight: 600;
        }
        #ras-body {
            padding: 15px;
            overflow-y: auto;
        }
        #ras-toggle-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 25px;
            background: #007aff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 10000;
            font-size: 24px;
        }
        .ras-field { margin-bottom: 12px; }
        .ras-field label { display: block; margin-bottom: 4px; font-size: 12px; color: #666; }
        .ras-field input, .ras-field select {
            width: 100%;
            padding: 6px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        .ras-btn {
            width: 100%;
            padding: 8px;
            background: #007aff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
        }
        .ras-btn:disabled { background: #ccc; cursor: not-allowed; }
        .ras-btn.stop { background: #ff3b30; margin-top: 10px; }
        #ras-log {
            margin-top: 15px;
            height: 150px;
            overflow-y: auto;
            background: #f9f9f9;
            border: 1px solid #eee;
            padding: 8px;
            font-size: 11px;
            font-family: monospace;
            white-space: pre-wrap;
        }
        .ras-log-entry { margin-bottom: 2px; border-bottom: 1px solid #eee; padding-bottom: 2px; }
        .ras-log-info { color: #333; }
        .ras-log-success { color: #28a745; }
        .ras-log-error { color: #dc3545; }
        .ras-log-warn { color: #ffc107; }
    `);

    // UI Construction
    function createUI() {
        // Toggle Button
        const toggleBtn = document.createElement('div');
        toggleBtn.id = 'ras-toggle-btn';
        toggleBtn.innerHTML = '🤖';
        toggleBtn.onclick = togglePanel;
        document.body.appendChild(toggleBtn);

        // Main Panel
        const panel = document.createElement('div');
        panel.id = 'ras-container';
        panel.style.display = 'none';

        panel.innerHTML = `
            <div id="ras-header">
                Raindrop AI Sorter
                <span style="font-size: 12px; font-weight: normal;">v0.1</span>
            </div>
            <div id="ras-body">
                <div class="ras-field">
                    <label>Raindrop Test Token</label>
                    <input type="password" id="ras-raindrop-token" placeholder="Enter Test Token from Settings" value="${STATE.config.raindropToken}">
                </div>

                <div class="ras-field">
                    <label>AI Provider</label>
                    <select id="ras-provider">
                        <option value="openai" ${STATE.config.provider === 'openai' ? 'selected' : ''}>OpenAI</option>
                        <option value="anthropic" ${STATE.config.provider === 'anthropic' ? 'selected' : ''}>Anthropic</option>
                        <option value="custom" ${STATE.config.provider === 'custom' ? 'selected' : ''}>Custom / Local (Ollama)</option>
                    </select>
                </div>

                <div class="ras-field" id="ras-openai-group">
                    <label>OpenAI API Key</label>
                    <input type="password" id="ras-openai-key" placeholder="sk-..." value="${STATE.config.openaiKey}">
                </div>

                <div class="ras-field" id="ras-anthropic-group" style="display:none">
                    <label>Anthropic API Key</label>
                    <input type="password" id="ras-anthropic-key" placeholder="sk-ant-..." value="${STATE.config.anthropicKey}">
                </div>

                <div class="ras-field">
                    <label>Collection to Sort</label>
                    <select id="ras-collection-select">
                        <option value="0">All Bookmarks</option>
                        <option value="-1">Unsorted</option>
                        <!-- Will be populated dynamically -->
                    </select>
                </div>

                 <div class="ras-field">
                    <label>Action</label>
                     <select id="ras-action-mode">
                        <option value="tag_only">Tag Bookmarks Only</option>
                        <option value="organize_only">Organize (Cluster Tags)</option>
                        <option value="full">Full (Tag + Organize)</option>
                        <option value="cleanup_tags">Cleanup Tags (Deduplicate)</option>
                    </select>
                </div>

                <div>
                    <a href="#" id="ras-advanced-toggle" style="font-size: 12px; text-decoration: none; color: #007aff;">▶ Show Advanced Settings</a>
                </div>

                <div id="ras-advanced-group" style="display:none; margin-top: 10px; border-top: 1px solid #eee; padding-top: 10px;">
                    <div id="ras-custom-group" style="display:none">
                         <div class="ras-field">
                            <label>Base URL (OpenAI Compatible)</label>
                            <input type="text" id="ras-custom-url" placeholder="http://localhost:11434/v1" value="${STATE.config.customBaseUrl}">
                        </div>
                         <div class="ras-field">
                            <label>Model Name</label>
                            <input type="text" id="ras-custom-model" placeholder="llama3" value="${STATE.config.customModel}">
                        </div>
                    </div>

                    <div class="ras-field">
                        <label>Concurrency (Batch Size)</label>
                        <input type="number" id="ras-concurrency" min="1" max="10" value="${STATE.config.concurrency}">
                    </div>

                    <div class="ras-field">
                        <label style="display:inline-block; margin-right: 10px;">
                            <input type="checkbox" id="ras-skip-tagged" ${STATE.config.skipTagged ? 'checked' : ''} style="width:auto">
                            Skip tagged
                        </label>
                        <label style="display:inline-block">
                            <input type="checkbox" id="ras-dry-run" ${STATE.config.dryRun ? 'checked' : ''} style="width:auto">
                            Dry Run (Simulate)
                        </label>
                    </div>

                    <div class="ras-field">
                        <label>Tagging Prompt Template</label>
                        <textarea id="ras-tag-prompt" rows="3" placeholder="Default: Analyze content and suggest 3-5 tags..." style="width:100%; font-size: 11px;">${STATE.config.taggingPrompt}</textarea>
                    </div>

                    <div class="ras-field">
                        <label>Clustering Prompt Template</label>
                        <textarea id="ras-cluster-prompt" rows="3" placeholder="Default: Group tags into 5-10 categories..." style="width:100%; font-size: 11px;">${STATE.config.clusteringPrompt}</textarea>
                    </div>

                    <div class="ras-field">
                        <label>Ignored Tags (Comma Separated)</label>
                        <textarea id="ras-ignored-tags" rows="2" placeholder="e.g. to read, article, 2024" style="width:100%; font-size: 11px;">${STATE.config.ignoredTags}</textarea>
                    </div>

                    <div class="ras-field">
                        <label style="display:inline-block; margin-right: 10px;">
                            <input type="checkbox" id="ras-auto-describe" ${STATE.config.autoDescribe ? 'checked' : ''} style="width:auto">
                            Auto-describe
                        </label>
                        <label style="display:inline-block">
                            <input type="checkbox" id="ras-nested-collections" ${STATE.config.nestedCollections ? 'checked' : ''} style="width:auto">
                            Allow Nested Collections
                        </label>
                    </div>

                    <div class="ras-field" id="ras-desc-prompt-group" style="display:none">
                        <label>Description Prompt Template</label>
                        <textarea id="ras-desc-prompt" rows="3" placeholder="Default: Summarize the content in 2 sentences..." style="width:100%; font-size: 11px;">${STATE.config.descriptionPrompt}</textarea>
                    </div>
                </div>

                <div id="ras-progress-container" style="display:none; margin-bottom: 10px; background: #eee; height: 10px; border-radius: 5px; overflow: hidden;">
                    <div id="ras-progress-bar" style="width: 0%; height: 100%; background: #28a745; transition: width 0.3s;"></div>
                </div>

                <button id="ras-start-btn" class="ras-btn">Start Sorting</button>
                <button id="ras-stop-btn" class="ras-btn stop" style="display:none">Stop</button>

                <div id="ras-log"></div>
            </div>
        `;

        document.body.appendChild(panel);

        // Event Listeners
        document.getElementById('ras-provider').addEventListener('change', (e) => {
            updateProviderVisibility();
            saveConfig();
        });

        document.getElementById('ras-advanced-toggle').addEventListener('click', (e) => {
            e.preventDefault();
            const grp = document.getElementById('ras-advanced-group');
            if (grp.style.display === 'none') {
                grp.style.display = 'block';
                e.target.innerText = '▼ Hide Advanced Settings';
            } else {
                grp.style.display = 'none';
                e.target.innerText = '▶ Show Advanced Settings';
            }
        });

        document.getElementById('ras-start-btn').addEventListener('click', startSorting);
        document.getElementById('ras-stop-btn').addEventListener('click', stopSorting);

        // Input listeners to save config
        ['ras-raindrop-token', 'ras-openai-key', 'ras-anthropic-key', 'ras-skip-tagged', 'ras-custom-url', 'ras-custom-model', 'ras-concurrency', 'ras-dry-run', 'ras-tag-prompt', 'ras-cluster-prompt', 'ras-ignored-tags', 'ras-auto-describe', 'ras-desc-prompt', 'ras-nested-collections'].forEach(id => {
            const el = document.getElementById(id);
            el.addEventListener('change', saveConfig);
        });

        document.getElementById('ras-auto-describe').addEventListener('change', (e) => {
             document.getElementById('ras-desc-prompt-group').style.display = e.target.checked ? 'block' : 'none';
        });

        updateProviderVisibility();
    }

    function togglePanel() {
        const panel = document.getElementById('ras-container');
        if (panel.style.display === 'none') {
            panel.style.display = 'flex';
        } else {
            panel.style.display = 'none';
        }
    }

    function updateProviderVisibility() {
        const val = document.getElementById('ras-provider').value;
        document.getElementById('ras-openai-group').style.display = val === 'openai' ? 'block' : 'none';
        document.getElementById('ras-anthropic-group').style.display = val === 'anthropic' ? 'block' : 'none';
        document.getElementById('ras-custom-group').style.display = val === 'custom' ? 'block' : 'none';
    }

    function saveConfig() {
        STATE.config.raindropToken = document.getElementById('ras-raindrop-token').value;
        STATE.config.openaiKey = document.getElementById('ras-openai-key').value;
        STATE.config.anthropicKey = document.getElementById('ras-anthropic-key').value;
        STATE.config.provider = document.getElementById('ras-provider').value;
        STATE.config.skipTagged = document.getElementById('ras-skip-tagged').checked;
        STATE.config.customBaseUrl = document.getElementById('ras-custom-url').value;
        STATE.config.customModel = document.getElementById('ras-custom-model').value;
        STATE.config.concurrency = parseInt(document.getElementById('ras-concurrency').value) || 3;
        STATE.config.dryRun = document.getElementById('ras-dry-run').checked;
        STATE.config.taggingPrompt = document.getElementById('ras-tag-prompt').value;
        STATE.config.clusteringPrompt = document.getElementById('ras-cluster-prompt').value;
        STATE.config.ignoredTags = document.getElementById('ras-ignored-tags').value;
        STATE.config.autoDescribe = document.getElementById('ras-auto-describe').checked;
        STATE.config.descriptionPrompt = document.getElementById('ras-desc-prompt').value;
        STATE.config.nestedCollections = document.getElementById('ras-nested-collections').checked;

        GM_setValue('raindropToken', STATE.config.raindropToken);
        GM_setValue('openaiKey', STATE.config.openaiKey);
        GM_setValue('anthropicKey', STATE.config.anthropicKey);
        GM_setValue('provider', STATE.config.provider);
        GM_setValue('customBaseUrl', STATE.config.customBaseUrl);
        GM_setValue('customModel', STATE.config.customModel);
        GM_setValue('taggingPrompt', STATE.config.taggingPrompt);
        GM_setValue('clusteringPrompt', STATE.config.clusteringPrompt);
        GM_setValue('ignoredTags', STATE.config.ignoredTags);
        GM_setValue('descriptionPrompt', STATE.config.descriptionPrompt);
    }

    function log(message, type='info') {
        const logContainer = document.getElementById('ras-log');
        const entry = document.createElement('div');
        entry.className = `ras-log-entry ras-log-${type}`;
        entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        logContainer.prepend(entry); // Newest first
        console.log(`[RAS] ${message}`);
    }

    function updateProgress(percent) {
        const bar = document.getElementById('ras-progress-bar');
        const container = document.getElementById('ras-progress-container');
        if (bar && container) {
            container.style.display = 'block';
            bar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
        }
    }

    // Placeholders for main logic
    async function startSorting() {
        if (STATE.isRunning) return;
        saveConfig();

        if (!STATE.config.raindropToken) {
            log('Error: Raindrop Token is required', 'error');
            return;
        }

        STATE.isRunning = true;
        STATE.stopRequested = false;
        document.getElementById('ras-start-btn').style.display = 'none';
        document.getElementById('ras-stop-btn').style.display = 'block';
        updateProgress(0);

        if (STATE.config.dryRun) {
            log('--- DRY RUN MODE ENABLED ---', 'warn');
            log('No changes will be made to your bookmarks.', 'warn');
        }

        log('Starting process...');

        try {
            // Logic will go here
            await runMainProcess();
        } catch (e) {
            log(`Error: ${e.message}`, 'error');
            console.error(e);
        } finally {
            STATE.isRunning = false;
            document.getElementById('ras-start-btn').style.display = 'block';
            document.getElementById('ras-stop-btn').style.display = 'none';
            log('Process finished or stopped.');
            updateProgress(100);
            setTimeout(() => {
                 document.getElementById('ras-progress-container').style.display = 'none';
            }, 3000);
        }
    }

    function stopSorting() {
        if (STATE.isRunning) {
            STATE.stopRequested = true;
            log('Stopping... please wait for current tasks to finish.', 'warn');
        }
    }

    // Raindrop API Client
    class RaindropAPI {
        constructor(token) {
            this.baseUrl = 'https://api.raindrop.io/rest/v1';
            this.token = token;
            this.collectionCache = null; // Flat list cache
        }

        async loadCollectionCache(force = false) {
            if (this.collectionCache && !force) return;
            console.log('Loading Collection Cache...');
            try {
                // Fetch all collections. Raindrop /collections returns flattened hierarchy
                const res = await this.request('/collections');
                if (res.items) {
                    this.collectionCache = res.items;
                    console.log(`Cache loaded: ${this.collectionCache.length} collections`);
                }
            } catch(e) {
                console.warn('Failed to load collection cache', e);
            }
        }

        async request(endpoint, method = 'GET', body = null) {
            return this.fetchWithRetry(`${this.baseUrl}${endpoint}`, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                },
                data: body ? JSON.stringify(body) : null
            });
        }

        async fetchWithRetry(url, options, retries = 3, delay = 1000) {
            return new Promise((resolve, reject) => {
                const makeRequest = (attempt) => {
                    GM_xmlhttpRequest({
                        ...options,
                        url: url,
                        onload: function(response) {
                            if (response.status === 429) {
                                // Rate Limit Hit
                                const retryAfter = parseInt(response.responseHeaders?.match(/Retry-After: (\d+)/i)?.[1] || 60);
                                const waitTime = (retryAfter * 1000) + 1000;
                                console.warn(`[Raindrop API] Rate Limit 429. Waiting ${waitTime/1000}s...`);

                                if (attempt <= retries + 2) { // Allow more attempts for rate limits
                                    setTimeout(() => makeRequest(attempt + 1), waitTime);
                                    return;
                                }
                            }

                            if (response.status >= 200 && response.status < 300) {
                                try {
                                    resolve(JSON.parse(response.responseText));
                                } catch (e) {
                                    reject(new Error('Failed to parse JSON response'));
                                }
                            } else if (response.status >= 500 && attempt <= retries) {
                                // Server Error - Retry with backoff
                                const backoff = delay * Math.pow(2, attempt - 1);
                                console.warn(`[Raindrop API] Error ${response.status}. Retrying in ${backoff/1000}s...`);
                                setTimeout(() => makeRequest(attempt + 1), backoff);
                            } else {
                                reject(new Error(`API Error ${response.status}: ${response.statusText}`));
                            }
                        },
                        onerror: function(error) {
                            if (attempt <= retries) {
                                const backoff = delay * Math.pow(2, attempt - 1);
                                setTimeout(() => makeRequest(attempt + 1), backoff);
                            } else {
                                reject(error);
                            }
                        }
                    });
                };
                makeRequest(1);
            });
        }

        async getCollections() {
            if (this.collectionCache) return this.collectionCache;
            const res = await this.request('/collections');
            return res.items;
        }

        async getAllTags() {
            const res = await this.request('/tags');
            return res.items; // [{_id: "tagname", count: 10}, ...]
        }

        async removeTag(tagName) {
            if (STATE.config.dryRun) {
                console.log(`[DryRun] Delete Tag: ${tagName}`);
                return {};
            }
            return await this.request('/tags', 'DELETE', { ids: [tagName] });
        }

        async getChildCollections() {
             const res = await this.request('/collections/childrens');
             return res.items;
        }

        async getBookmarks(collectionId = 0, page = 0) {
            // perpage default is 25, max 50
            const res = await this.request(`/raindrops/${collectionId}?page=${page}&perpage=50`);
            return res;
        }

        async updateBookmark(id, data) {
            if (STATE.config.dryRun) {
                console.log(`[DryRun] Update Bookmark ${id}:`, data);
                return { item: { _id: id, ...data } };
            }
            return await this.request(`/raindrop/${id}`, 'PUT', data);
        }

        async createCollection(title, parentId = null) {
            if (STATE.config.dryRun) {
                console.log(`[DryRun] Create Collection: ${title} (Parent: ${parentId})`);
                // Fake item for cache logic
                const fake = { _id: 999999999 + Math.floor(Math.random()*1000), title, parent: parentId ? {$id: parentId} : undefined };
                if (this.collectionCache) this.collectionCache.push(fake);
                return { item: fake };
            }
            const data = { title };
            if (parentId) data.parent = { $id: parentId };
            const res = await this.request('/collection', 'POST', data);

            // Update cache
            if (res && res.item && this.collectionCache) {
                this.collectionCache.push(res.item);
            }
            return res;
        }

        async ensureCollectionPath(pathString, rootParentId = null) {
            // Path e.g., "Dev > Web > React"
            const parts = pathString.split(/[>/\\]/).map(s => s.trim()).filter(s => s);
            let currentParentId = rootParentId;
            let currentCollectionId = null;

            for (const part of parts) {
                // Find collection with this title and currentParentId
                try {
                    // Ensure cache is loaded at least once if not already
                    if (!this.collectionCache) await this.loadCollectionCache();
                    const allCols = this.collectionCache || [];

                    let found = null;
                    if (currentParentId) {
                        // Look for child
                        found = allCols.find(c =>
                            c.title.toLowerCase() === part.toLowerCase() &&
                            c.parent && c.parent.$id === currentParentId
                        );
                    } else {
                        // Look for root
                        found = allCols.find(c =>
                            c.title.toLowerCase() === part.toLowerCase() &&
                            (!c.parent)
                        );
                    }

                    if (found) {
                        currentCollectionId = found._id;
                        currentParentId = found._id;
                    } else {
                        // Create
                        const newCol = await this.createCollection(part, currentParentId);
                        if (newCol && newCol.item) {
                            currentCollectionId = newCol.item._id;
                            currentParentId = newCol.item._id;
                        } else {
                            throw new Error('Failed to create collection');
                        }
                    }
                } catch (e) {
                    console.error('Error ensuring path:', e);
                    return null;
                }
            }
            return currentCollectionId;
        }

        async moveBookmark(id, collectionId) {
             if (STATE.config.dryRun) {
                console.log(`[DryRun] Move Bookmark ${id} to ${collectionId}`);
                return { item: { _id: id, collection: { $id: collectionId } } };
            }
             return await this.request(`/raindrop/${id}`, 'PUT', { collection: { $id: collectionId } });
        }
    }

    // Scraper
    async function scrapeUrl(url) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                timeout: 10000,
                onload: function(response) {
                    if (response.status >= 200 && response.status < 300) {
                         const parser = new DOMParser();
                         const doc = parser.parseFromString(response.responseText, "text/html");

                         // Clean up junk
                         const toRemove = doc.querySelectorAll('script, style, nav, footer, iframe, noscript, svg, [role="alert"], .ads, .comment, .menu');
                         toRemove.forEach(s => s.remove());

                         // Improved Extraction (Readability-lite)
                         // 1. Find all paragraphs
                         const paragraphs = Array.from(doc.querySelectorAll('p'));

                         // 2. Score parents
                         const parentScores = new Map();
                         let maxScore = 0;
                         let bestCandidate = doc.body;

                         paragraphs.forEach(p => {
                             const text = p.innerText || "";
                             if (text.length < 50) return; // Skip short blurbs

                             const parent = p.parentElement;
                             const score = text.length; // Simple score by length

                             const current = parentScores.get(parent) || 0;
                             const newScore = current + score;
                             parentScores.set(parent, newScore);

                             if (newScore > maxScore) {
                                 maxScore = newScore;
                                 bestCandidate = parent;
                             }
                         });

                         // 3. Extract text from best candidate (or body fallback)
                         // 3. Extract text from best candidate (or body fallback)
                         const contentEl = bestCandidate || doc.body;
                         const bodyText = contentEl.innerText || contentEl.textContent;
                         let cleanText = bodyText.replace(/\s+/g, ' ').trim();

                         // 4. Metadata Fallback (if text is too short)
                         if (cleanText.length < 500) {
                             const ogDesc = doc.querySelector('meta[property="og:description"]')?.content || "";
                             const metaDesc = doc.querySelector('meta[name="description"]')?.content || "";
                             const ogTitle = doc.querySelector('meta[property="og:title"]')?.content || "";

                             const metadata = [ogTitle, ogDesc, metaDesc].filter(s => s).join("\n");
                             if (metadata.length > cleanText.length) {
                                 cleanText = metadata + "\n" + cleanText;
                             }
                         }

                         resolve({
                             title: doc.title,
                             text: cleanText.substring(0, 15000)
                         });
                    } else {
                        console.warn(`Failed to scrape ${url}: ${response.status}`);
                        resolve(null);
                    }
                },
                onerror: function(err) {
                    console.warn(`Error scraping ${url}:`, err);
                    resolve(null);
                },
                ontimeout: function() {
                     console.warn(`Timeout scraping ${url}`);
                     resolve(null);
                }
            });
        });
    }

    // LLM Client
    class LLMClient {
        constructor(config) {
            this.config = config;
        }

        async generateTags(content, existingTags = []) {
            let prompt = this.config.taggingPrompt;
            const ignoredTags = this.config.ignoredTags || "";
            const autoDescribe = this.config.autoDescribe;
            const descriptionPrompt = this.config.descriptionPrompt || "Summarize the content in 1-2 concise sentences.";

            if (!prompt || prompt.trim() === '') {
                 prompt = `
                    Analyze the following web page content.

                    Task 1: Suggest 3-5 relevant, hierarchical tags.
                    ${autoDescribe ? 'Task 2: ' + descriptionPrompt : ''}

                    Avoid using these tags: {{IGNORED_TAGS}}

                    Output ONLY a JSON object with the following structure:
                    {
                        "tags": ["tag1", "tag2"],
                        ${autoDescribe ? '"description": "The summary string"' : ''}
                    }

                    No markdown, no explanation.

                    Content:
                    {{CONTENT}}
                `;
            }

            // Replace placeholder
            prompt = prompt.replace('{{CONTENT}}', content.substring(0, 4000));
            prompt = prompt.replace('{{IGNORED_TAGS}}', ignoredTags);

            // Fallback if user didn't include {{CONTENT}}
            if (!prompt.includes(content.substring(0, 100))) {
                 prompt += `\n\nContent:\n${content.substring(0, 4000)}`;
            }

            let result = null;
            if (this.config.provider === 'openai') {
                result = await this.callOpenAI(prompt, true);
            } else if (this.config.provider === 'anthropic') {
                result = await this.callAnthropic(prompt, true);
            } else if (this.config.provider === 'custom') {
                result = await this.callOpenAI(prompt, true, true);
            }

            // Normalize result
            if (Array.isArray(result)) {
                return { tags: result, description: null };
            } else if (result && result.tags) {
                return result;
            } else {
                return { tags: [], description: null };
            }
        }

        async clusterTags(allTags) {
             let prompt = this.config.clusteringPrompt;
             const allowNested = this.config.nestedCollections;

             if (!prompt || prompt.trim() === '') {
                 prompt = `
                    Analyze this list of tags and group them into 5-10 broad categories.
                    ${allowNested ? 'You may use nested categories separated by ">" (e.g. "Development > Web").' : ''}
                    Output ONLY a JSON object where keys are category names and values are arrays of tags.
                    e.g. { "Programming": ["python", "js"], "News": ["politics"] }

                    Tags:
                    {{TAGS}}
                `;
             }

             prompt = prompt.replace('{{TAGS}}', JSON.stringify(allTags));

             // Fallback
             if (!prompt.includes(allTags[0])) {
                  prompt += `\n\nTags:\n${JSON.stringify(allTags)}`;
             }

             if (this.config.provider === 'openai') {
                const res = await this.callOpenAI(prompt, true);
                return res;
            } else if (this.config.provider === 'anthropic') {
                 const res = await this.callAnthropic(prompt, true);
                 return res;
            } else if (this.config.provider === 'custom') {
                return await this.callOpenAI(prompt, true, true);
            }
            return {};
        }

        async analyzeTagConsolidation(allTags) {
            const prompt = `
                Analyze this list of tags and identify synonyms, typos, or duplicates.
                Create a mapping where the key is the "Bad/Deprecated" tag and the value is the "Canonical/Good" tag.
                Only include pairs where a merge is necessary.

                Example: { "js": "javascript", "reactjs": "react", "machine-learning": "ai" }

                Tags:
                ${JSON.stringify(allTags.slice(0, 1000))}
            `;
            // Note: Truncating tags list to avoid context limits if user has thousands

            if (this.config.provider === 'openai') {
                return await this.callOpenAI(prompt, true);
            } else if (this.config.provider === 'anthropic') {
                 return await this.callAnthropic(prompt, true);
            } else if (this.config.provider === 'custom') {
                return await this.callOpenAI(prompt, true, true);
            }
            return {};
        }

        async callOpenAI(prompt, isObject = false, isCustom = false) {
             const baseUrl = isCustom ? this.config.customBaseUrl : 'https://api.openai.com/v1';
             const url = baseUrl.endsWith('/') ? `${baseUrl}chat/completions` : `${baseUrl}/chat/completions`;
             const model = isCustom ? this.config.customModel : 'gpt-3.5-turbo';
             const headers = { 'Content-Type': 'application/json' };

             if (!isCustom) {
                 headers['Authorization'] = `Bearer ${this.config.openaiKey}`;
             }

             return this.fetchWithRetry(url, {
                method: 'POST',
                headers: headers,
                data: JSON.stringify({
                    model: model,
                    messages: [{role: 'user', content: prompt}],
                    temperature: 0.3,
                    stream: false
                })
             }).then(data => {
                 if (data.error) throw new Error(data.error.message);
                 const text = data.choices[0].message.content.trim();
                 const cleanJson = text.replace(/```json/g, '').replace(/```/g, '');
                 return JSON.parse(cleanJson);
             }).catch(e => {
                 console.error('LLM Error', e);
                 return isObject ? {} : [];
             });
        }

        async fetchWithRetry(url, options, retries = 3, delay = 2000) {
            return new Promise((resolve, reject) => {
                const makeRequest = (attempt) => {
                    GM_xmlhttpRequest({
                        ...options,
                        url: url,
                        onload: function(response) {
                            if (response.status === 429) {
                                // Rate Limit
                                const waitTime = 5000 * attempt; // Aggressive backoff for LLMs
                                console.warn(`[LLM API] Rate Limit 429. Waiting ${waitTime/1000}s...`);
                                if (attempt <= retries + 2) {
                                    setTimeout(() => makeRequest(attempt + 1), waitTime);
                                    return;
                                }
                            }

                            if (response.status >= 200 && response.status < 300) {
                                try {
                                    resolve(JSON.parse(response.responseText));
                                } catch (e) {
                                    reject(new Error('Failed to parse JSON response'));
                                }
                            } else if (response.status >= 500 && attempt <= retries) {
                                const backoff = delay * Math.pow(2, attempt - 1);
                                setTimeout(() => makeRequest(attempt + 1), backoff);
                            } else {
                                reject(new Error(`API Error ${response.status}: ${response.responseText}`));
                            }
                        },
                        onerror: function(error) {
                            if (attempt <= retries) {
                                setTimeout(() => makeRequest(attempt + 1), delay * attempt);
                            } else {
                                reject(error);
                            }
                        }
                    });
                };
                makeRequest(1);
            });
        }

        async callAnthropic(prompt, isObject = false) {
             return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: 'https://api.anthropic.com/v1/messages',
                    headers: {
                        'x-api-key': this.config.anthropicKey,
                        'anthropic-version': '2023-06-01',
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        model: 'claude-3-haiku-20240307',
                        max_tokens: 1024,
                        messages: [{role: 'user', content: prompt}]
                    }),
                    onload: function(response) {
                        try {
                            const data = JSON.parse(response.responseText);
                            if (data.error) throw new Error(data.error.message);
                            const text = data.content[0].text.trim();
                             const cleanJson = text.replace(/```json/g, '').replace(/```/g, '');
                            resolve(JSON.parse(cleanJson));
                        } catch (e) {
                             console.error('Anthropic Error', e, response.responseText);
                             resolve(isObject ? {} : []);
                        }
                    },
                    onerror: reject
                });
            });
        }
    }

    async function runMainProcess() {
        const api = new RaindropAPI(STATE.config.raindropToken);
        const llm = new LLMClient(STATE.config);
        const collectionId = document.getElementById('ras-collection-select').value;
        const mode = document.getElementById('ras-action-mode').value;

        let allTags = new Set();
        let processedCount = 0;

        // --- Phase 1: Tagging ---
        if (mode === 'tag_only' || mode === 'full') {
            log('Phase 1: Fetching bookmarks...');
            let page = 0;
            let hasMore = true;
            let totalItemsApprox = 0; // Raindrop doesn't always give easy total without extra calls

            // Try to get total count first for progress bar
            try {
                 // Fetch count only? or just assume from first page
                 const res = await api.getBookmarks(collectionId, 0);
                 if(res.count) totalItemsApprox = res.count;
            } catch(e) {}

            while (hasMore && !STATE.stopRequested) {
                try {
                    const res = await api.getBookmarks(collectionId, page);
                    const bookmarks = res.items;
                    if (bookmarks.length === 0) {
                        hasMore = false;
                        break;
                    }

                    log(`Processing page ${page} (${bookmarks.length} items)...`);

                    // Filter out already tagged items if config says so
                    const itemsToProcess = STATE.config.skipTagged
                        ? bookmarks.filter(bm => !bm.tags || bm.tags.length === 0)
                        : bookmarks;

                    if (itemsToProcess.length === 0) {
                        log('All items on this page skipped (already tagged).');
                        page++;
                        continue;
                    }

                    // Process batch with concurrency
                    const chunks = [];
                    for (let i = 0; i < itemsToProcess.length; i += STATE.config.concurrency) {
                        chunks.push(itemsToProcess.slice(i, i + STATE.config.concurrency));
                    }

                    for (const chunk of chunks) {
                        if (STATE.stopRequested) break;

                        await Promise.all(chunk.map(async (bm) => {
                            try {
                                log(`Scraping: ${bm.title.substring(0, 30)}...`);
                                const scraped = await scrapeUrl(bm.link);

                                let result = { tags: [], description: null };
                                if (scraped && scraped.text) {
                                    log(`Generating tags for: ${bm.title.substring(0, 20)}...`);
                                    result = await llm.generateTags(scraped.text, bm.tags);
                                } else {
                                    log(`Skipping content gen for ${bm.title} (scrape failed), using metadata`);
                                    result = await llm.generateTags(bm.title + "\n" + bm.excerpt, bm.tags);
                                }

                                const updateData = {};

                                if (result.tags && result.tags.length > 0) {
                                    const combinedTags = [...new Set([...(bm.tags || []), ...result.tags])];
                                    updateData.tags = combinedTags;
                                    combinedTags.forEach(t => allTags.add(t));
                                }

                                if (STATE.config.autoDescribe && result.description) {
                                    updateData.excerpt = result.description;
                                }

                                if (Object.keys(updateData).length > 0) {
                                    await api.updateBookmark(bm._id, updateData);
                                    log(`Updated ${bm.title} (${updateData.tags ? updateData.tags.length + ' tags' : ''}${updateData.excerpt ? ', desc' : ''})`, 'success');
                                }
                            } catch (err) {
                                log(`Failed to process ${bm.title}: ${err.message}`, 'error');
                            }
                        }));
                    }

                    // Small pause between batches to be nice
                    await new Promise(r => setTimeout(r, 500));

                    page++;
                    processedCount += bookmarks.length;

                    if (totalItemsApprox > 0) {
                        updateProgress((processedCount / totalItemsApprox) * 100);
                    }

                } catch (e) {
                    log(`Error fetching bookmarks: ${e.message}`, 'error');
                    break;
                }
            }
        }

        if (STATE.stopRequested) return;

        // --- Phase 3: Cleanup (Tag Consolidation) ---
        if (mode === 'cleanup_tags') {
            log('Phase 3: Tag Cleanup...');

            // 1. Fetch all tags
            log('Fetching all tags...');
            let allUserTags = [];
            try {
                allUserTags = await api.getAllTags();
            } catch(e) {
                log('Failed to fetch tags: ' + e.message, 'error');
                return;
            }

            if (allUserTags.length === 0) {
                log('No tags found to cleanup.', 'warn');
                return;
            }

            // 2. Analyze with LLM
            log(`Analyzing ${allUserTags.length} tags for duplicates/synonyms...`);
            const tagNames = allUserTags.map(t => t._id);
            const mergePlan = await llm.analyzeTagConsolidation(tagNames);

            const changes = Object.entries(mergePlan);
            if (changes.length === 0) {
                log('No tag consolidations suggested.');
                return;
            }

            log(`Proposed merges: ${changes.length}`);
            log(JSON.stringify(mergePlan, null, 2));

            if (STATE.config.dryRun) {
                log('DRY RUN: No tags modified.');
                return;
            }

            // 3. Execute Merges
            // Iterate map: "Bad" -> "Good"
            let processed = 0;
            updateProgress(0);

            for (const [badTag, goodTag] of changes) {
                if (STATE.stopRequested) break;

                log(`Merging "${badTag}" into "${goodTag}"...`);

                // Fetch bookmarks with badTag
                // Note: Raindrop search for tag is #tagname
                // Use API to get IDs? Or simple search?
                // The /raindrops/0?search=[{"key":"tag","val":"badTag"}] endpoint logic needed?
                // Or search string: "#badTag"

                let page = 0;
                let hasMore = true;

                while(hasMore && !STATE.stopRequested) {
                    // Search for the bad tag
                    const searchStr = encodeURIComponent(`#"${badTag}"`);
                    const res = await api.request(`/raindrops/0?search=${searchStr}&page=${page}&perpage=50`);

                    if (!res.items || res.items.length === 0) {
                        hasMore = false;
                        break;
                    }

                    const itemsToUpdate = res.items;

                    // Update each item: Add goodTag, Remove badTag
                    // Actually, if we just add GoodTag, we can delete BadTag globally later?
                    // Raindrop API: Update tags list.

                    await Promise.all(itemsToUpdate.map(async (bm) => {
                        const newTags = bm.tags.filter(t => t !== badTag);
                        if (!newTags.includes(goodTag)) newTags.push(goodTag);

                        await api.updateBookmark(bm._id, { tags: newTags });
                    }));

                    // If we modified items, they might disappear from search view if we paginate?
                    // Raindrop search pagination is stable if criteria still matches?
                    // If we remove the tag, it NO LONGER matches search `#"badTag"`.
                    // So next fetch of page 0 will return new items.
                    // So we should keep page = 0.
                    // But we need to ensure we actually removed the tag.

                    if (itemsToUpdate.length < 50) hasMore = false;
                }

                // Finally delete the bad tag explicitly to be clean
                await api.removeTag(badTag);
                log(`Removed tag "${badTag}"`);

                processed++;
                updateProgress((processed / changes.length) * 100);
            }
        }

        // --- Phase 2: Recursive Clustering & Organization ---
        if (mode === 'organize_only' || mode === 'full') {
            log('Phase 2: Recursive Organizing...');

            // Parse Ignored Tags
            const ignoredTagsList = STATE.config.ignoredTags
                ? STATE.config.ignoredTags.split(',').map(t => t.trim().toLowerCase()).filter(t => t)
                : [];
            const ignoredTagsSet = new Set(ignoredTagsList);

            // Pre-fetch collections into cache to optimize hierarchical lookups
            log('Loading collection structure...');
            await api.loadCollectionCache(true);

            // Initialize category cache from loaded collections
            const categoryCache = {}; // name -> id
            try {
                const existingCols = await api.getCollections();
                existingCols.forEach(c => {
                    categoryCache[c.title.toLowerCase()] = c._id;
                    categoryCache[c.title] = c._id;
                });
            } catch(e) { console.warn("Could not pre-fetch collections"); }

            let iteration = 0;
            const MAX_ITERATIONS = 3; // Prevent infinite loops

            while(iteration < MAX_ITERATIONS && !STATE.stopRequested) {
                iteration++;
                log(`Starting Clustering Iteration ${iteration}...`);

                // Step A: Collect tags from current items in the target collection
                // If sorting "All Bookmarks" (0), we usually only want to move things that are NOT in a nested collection?
                // Or we move everything. The prompt implies organizing *everything*.
                // But for "Recursive", we look at what's *left* in the source collection.

                let currentTags = new Set();
                let bookmarksToOrganize = [];

                // Fetch first few pages to analyze tags
                // We'll fetch up to 200 items to form a cluster
                log('Scanning items for tags...');
                for(let p=0; p<4; p++) {
                    try {
                        const res = await api.getBookmarks(collectionId, p);
                        if (!res.items || res.items.length === 0) break;
                        bookmarksToOrganize.push(...res.items);
                        res.items.forEach(bm => {
                            bm.tags.forEach(t => {
                                if (!ignoredTagsSet.has(t.toLowerCase())) {
                                    currentTags.add(t);
                                }
                            });
                        });
                    } catch(e) { break; }
                }

                if (currentTags.size === 0) {
                    log('No tags found (after filtering) in remaining items. Stopping.');
                    break;
                }

                // Step B: Cluster these specific tags
                log(`Clustering ${currentTags.size} tags (Iteration ${iteration})...`);
                const clusters = await llm.clusterTags(Array.from(currentTags));

                if (Object.keys(clusters).length === 0) {
                    log('No clusters suggested by LLM. Stopping.');
                    break;
                }

                log(`Clusters found: ${Object.keys(clusters).join(', ')}`);

                // Invert map
                const tagToCategory = {};
                for (const [category, tags] of Object.entries(clusters)) {
                    tags.forEach(t => tagToCategory[t] = category);
                }

                // Step C: Move matching items
                let itemsMovedInThisPass = 0;

                // We iterate through the bookmarks we fetched (and maybe more if we implemented a full sweep)
                // For this implementation, we organize the batch we fetched.
                // Then the next iteration will fetch the *next* batch (or the same page if items moved out).

                for (const bm of bookmarksToOrganize) {
                     if (STATE.stopRequested) break;

                     const votes = {};
                     let maxVote = 0;
                     let bestCategory = null;

                     bm.tags.forEach(t => {
                         const cat = tagToCategory[t];
                         if (cat) {
                             votes[cat] = (votes[cat] || 0) + 1;
                             if (votes[cat] > maxVote) {
                                 maxVote = votes[cat];
                                 bestCategory = cat;
                             }
                         }
                     });

                     if (bestCategory) {
                         // Check/Create Collection
                         let targetColId = categoryCache[bestCategory] || categoryCache[bestCategory.toLowerCase()];

                         if (!targetColId) {
                             try {
                                 if (STATE.config.nestedCollections && (bestCategory.includes('>') || bestCategory.includes('/') || bestCategory.includes('\\'))) {
                                     log(`Ensuring path: ${bestCategory}`);
                                     targetColId = await api.ensureCollectionPath(bestCategory);
                                 } else {
                                     // Flat creation logic
                                     const existingCols = await api.getCollections();
                                     const found = existingCols.find(c => c.title.toLowerCase() === bestCategory.toLowerCase());
                                     if (found) {
                                         targetColId = found._id;
                                     } else {
                                         log(`Creating collection: ${bestCategory}`);
                                         const newCol = await api.createCollection(bestCategory);
                                         targetColId = newCol.item._id;
                                     }
                                 }

                                 if(targetColId) {
                                     categoryCache[bestCategory] = targetColId;
                                     categoryCache[bestCategory.toLowerCase()] = targetColId;
                                 }
                             } catch (e) {
                                 log(`Error creating collection ${bestCategory}`, 'error');
                                 continue;
                             }
                         }

                         // Move
                         if (targetColId) {
                             try {
                                await api.moveBookmark(bm._id, targetColId);
                                itemsMovedInThisPass++;
                                log(`Moved ${bm.title} -> ${bestCategory}`, 'success');
                             } catch(e) {
                                 log(`Failed to move ${bm.title}`, 'error');
                             }
                         }
                     }
                }

                log(`Iteration ${iteration} complete. Moved ${itemsMovedInThisPass} items.`);

                if (itemsMovedInThisPass === 0) {
                    log("No items moved in this iteration. Stopping recursion to avoid infinite loop.");
                    break;
                }

                // If sorting "Unsorted", moved items are gone.
                // If sorting "All", moved items are still there but now have a collection.
                // If we want to move them *out* of "Unsorted", we are good.
                // If we want to organize "All" into subfolders, we might be moving them from "Unsorted" or "Root" to "Folder".

                // If we are in "Unsorted" and items moved, we have new items on Page 0 next time.
                // So the loop continues naturally.
            }
        }
    }

    // Initialize
    window.addEventListener('load', () => {
        createUI();
        // Try to populate collections if token is already there
        if(STATE.config.raindropToken) {
            const api = new RaindropAPI(STATE.config.raindropToken);
            api.getCollections().then(items => {
                 const sel = document.getElementById('ras-collection-select');
                 items.forEach(c => {
                     const opt = document.createElement('option');
                     opt.value = c._id;
                     opt.innerText = c.title;
                     sel.appendChild(opt);
                 });
            }).catch(e => console.log("Could not auto-load collections", e));
        }
    });

})();
