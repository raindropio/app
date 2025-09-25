import Foundation

extension NSItemProvider {
    public func loadObject(ofClass aClass: any NSItemProviderReading.Type) async throws -> (any NSItemProviderReading)? {
        try await withCheckedThrowingContinuation { continuation in
            self.loadObject(ofClass: aClass) { result, error in
                if let error {
                    continuation.resume(throwing: error)
                    return
                }
                continuation.resume(returning: result)
            }
        }
    }
}
