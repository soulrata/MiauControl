visualizerBars.forEach((bar, index) => {
    const value = dataArray[index] / 128;
    const height = Math.max(2, value * 40);
    bar.style.height = `${height}px`;
});