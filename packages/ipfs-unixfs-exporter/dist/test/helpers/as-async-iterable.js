async function* asAsyncIterable(arr) {
    if (!Array.isArray(arr)) {
        arr = [arr];
    }
    yield* arr;
}
export default asAsyncIterable;
//# sourceMappingURL=as-async-iterable.js.map