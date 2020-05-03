test('localStorage mock should work', () => {
    expect(localStorage).not.toBeUndefined();
    expect(localStorage.getItem('test')).toBeNull();
    localStorage.setItem('test', 'Hello, world!');
    expect(localStorage.getItem('test')).toBe('Hello, world!');
});
