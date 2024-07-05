export const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
};

export function convertTimestampToLocalTime(timestamp) {
    let date = new Date(timestamp * 1000);
    let localDate = date.toLocaleDateString();
    let localTime = date.toLocaleTimeString();
    return `${localDate} ${localTime}`;
}

export function formatNumberWithMillions(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else {
      return num.toFixed(2);
    }
  }