/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} [email]
 * @property {string} [fullName]
 */

/**
 * @typedef {Object} Resume
 * @property {number} id
 * @property {string} title
 * @property {string} [summary]
 * @property {string} [content]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} ResumeVersion
 * @property {number} id
 * @property {number} resumeId
 * @property {number} versionNumber
 * @property {string} [note]
 * @property {string} createdAt
 */

export {};
