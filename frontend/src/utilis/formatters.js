// Date and time formatters
export const formatDate = (date, format = 'default') => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid date';

  const formats = {
    default: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    short: { month: 'short', day: 'numeric' },
    iso: null, // Will use toISOString()
    relative: null // Will use relative time
  };

  if (format === 'iso') {
    return d.toISOString().split('T')[0];
  }

  if (format === 'relative') {
    return formatRelativeTime(d);
  }

  return d.toLocaleDateString('en-US', formats[format] || formats.default);
};

export const formatTime = (date, format = '12hour') => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid time';

  if (format === '24hour') {
    return d.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }

  return d.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

export const formatDateTime = (date, format = 'default') => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid date';

  const formats = {
    default: { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    },
    long: { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    },
    short: { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }
  };

  return d.toLocaleDateString('en-US', formats[format] || formats.default);
};

export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 }
  ];

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
};

// Number formatters
export const formatNumber = (number, options = {}) => {
  if (typeof number !== 'number') return '0';

  const {
    decimals = 0,
    useGrouping = true,
    prefix = '',
    suffix = ''
  } = options;

  return prefix + number.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping
  }) + suffix;
};

export const formatCurrency = (amount, currency = 'USD') => {
  if (typeof amount !== 'number') return '$0';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
};

export const formatPercentage = (value, decimals = 1) => {
  if (typeof value !== 'number') return '0%';

  return (value * 100).toFixed(decimals) + '%';
};

export const formatCompactNumber = (number) => {
  if (typeof number !== 'number') return '0';

  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short'
  });

  return formatter.format(number);
};

// File size formatter
export const formatFileSize = (bytes) => {
  if (typeof bytes !== 'number' || bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// String formatters
export const formatInitials = (name, maxInitials = 2) => {
  if (!name) return '';

  return name
    .split(' ')
    .slice(0, maxInitials)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

export const formatName = (firstName, lastName, format = 'full') => {
  if (!firstName && !lastName) return '';

  const formats = {
    full: `${firstName || ''} ${lastName || ''}`.trim(),
    firstLast: `${firstName || ''} ${lastName || ''}`.trim(),
    lastFirst: `${lastName || ''}, ${firstName || ''}`.trim(),
    firstInitial: `${firstName || ''} ${lastName ? lastName.charAt(0) + '.' : ''}`.trim(),
    initials: formatInitials(`${firstName || ''} ${lastName || ''}`),
    first: firstName || '',
    last: lastName || ''
  };

  return formats[format] || formats.full;
};

export const formatPhone = (phoneNumber) => {
  if (!phoneNumber) return '';

  // Remove all non-digits
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  return phoneNumber; // Return original if doesn't match expected format
};

export const formatEmail = (email) => {
  if (!email) return '';
  return email.toLowerCase().trim();
};

// Text formatters
export const truncateText = (text, maxLength, suffix = '...') => {
  if (!text || typeof text !== 'string') return '';
  
  if (text.length <= maxLength) return text;
  
  return text.slice(0, maxLength - suffix.length) + suffix;
};

export const formatSlug = (text) => {
  if (!text) return '';

  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

export const capitalizeFirst = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const capitalizeWords = (text) => {
  if (!text) return '';
  
  return text
    .split(' ')
    .map(word => capitalizeFirst(word))
    .join(' ');
};

// URL formatters
export const formatURL = (url) => {
  if (!url) return '';
  
  // Add protocol if missing
  if (!url.match(/^https?:\/\//)) {
    return `https://${url}`;
  }
  
  return url;
};

export const formatDomain = (url) => {
  if (!url) return '';
  
  try {
    const domain = new URL(formatURL(url)).hostname;
    return domain.replace(/^www\./, '');
  } catch {
    return url;
  }
};

// Social media formatters
export const formatHandle = (handle, platform = 'twitter') => {
  if (!handle) return '';

  const cleaned = handle.replace(/^@/, '');
  
  const baseUrls = {
    twitter: 'https://twitter.com/',
    instagram: 'https://instagram.com/',
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/in/'
  };

  return baseUrls[platform] + cleaned;
};

// Status formatters
export const formatStatus = (status) => {
  if (!status) return '';

  const statusMap = {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    draft: 'Draft',
    published: 'Published',
    archived: 'Archived',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled'
  };

  return statusMap[status] || capitalizeWords(status.replace(/_/g, ' '));
};

// Progress formatters
export const formatProgress = (current, total, showPercentage = true) => {
  if (!total || total === 0) return showPercentage ? '0%' : '0/0';

  const percentage = Math.round((current / total) * 100);
  
  if (showPercentage) {
    return `${percentage}%`;
  }
  
  return `${current}/${total}`;
};

// Rating formatters
export const formatRating = (rating, maxRating = 5, decimals = 1) => {
  if (typeof rating !== 'number') return '0';
  
  const formatted = Math.min(maxRating, Math.max(0, rating)).toFixed(decimals);
  return `${formatted}/${maxRating}`;
};

// Duration formatters
export const formatDuration = (seconds, format = 'long') => {
  if (typeof seconds !== 'number' || seconds < 0) return '0 seconds';

  const units = [
    { name: 'year', nameShort: 'y', value: 365 * 24 * 3600 },
    { name: 'month', nameShort: 'mo', value: 30 * 24 * 3600 },
    { name: 'week', nameShort: 'w', value: 7 * 24 * 3600 },
    { name: 'day', nameShort: 'd', value: 24 * 3600 },
    { name: 'hour', nameShort: 'h', value: 3600 },
    { name: 'minute', nameShort: 'm', value: 60 },
    { name: 'second', nameShort: 's', value: 1 }
  ];

  for (const unit of units) {
    const count = Math.floor(seconds / unit.value);
    if (count >= 1) {
      const unitName = format === 'short' 
        ? unit.nameShort 
        : count === 1 ? unit.name : `${unit.name}s`;
      
      return format === 'short' 
        ? `${count}${unitName}`
        : `${count} ${unitName}`;
    }
  }

  return format === 'short' ? '0s' : '0 seconds';
};

// Array formatters
export const formatList = (items, conjunction = 'and', maxItems = 3) => {
  if (!Array.isArray(items) || items.length === 0) return '';

  if (items.length === 1) return items[0];
  
  if (items.length === 2) {
    return `${items[0]} ${conjunction} ${items[1]}`;
  }

  if (items.length <= maxItems) {
    const last = items.pop();
    return `${items.join(', ')}, ${conjunction} ${last}`;
  }

  const visible = items.slice(0, maxItems);
  const remaining = items.length - maxItems;
  return `${visible.join(', ')}, ${conjunction} ${remaining} more`;
};

// Validation helpers
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const isValidURL = (url) => {
  try {
    new URL(formatURL(url));
    return true;
  } catch {
    return false;
  }
};

export default {
  // Date/Time
  formatDate,
  formatTime,
  formatDateTime,
  formatRelativeTime,
  
  // Numbers
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatCompactNumber,
  
  // Files
  formatFileSize,
  
  // Strings
  formatInitials,
  formatName,
  formatPhone,
  formatEmail,
  truncateText,
  formatSlug,
  capitalizeFirst,
  capitalizeWords,
  
  // URLs
  formatURL,
  formatDomain,
  formatHandle,
  
  // Status/Progress
  formatStatus,
  formatProgress,
  formatRating,
  formatDuration,
  formatList,
  
  // Validation
  isValidEmail,
  isValidPhone,
  isValidURL
};