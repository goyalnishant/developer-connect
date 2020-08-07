const arrayBufferToImage = (buffer) => {
    var base64Flag = 'data:image/jpeg;base64,';
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return base64Flag+window.btoa(binary);
}

export default arrayBufferToImage