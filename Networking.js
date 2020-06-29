export function fetchWithTimeout(ms, promise) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        reject(new Error('timeout'))
        }, ms)
        promise.then(resolve, reject)
    })
}