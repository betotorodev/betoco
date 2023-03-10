export const COMMIT_TYPES = {
  feat: {
    emoji: '๐',
    description: 'Add new feature',
    release: true
  },
  fix: {
    emoji: '๐',
    description: 'Fixing a bug',
    release: true
  },
  perf: {
    emoji: '๐ซ',
    description: 'Improve performance',
    release: true
  },
  docs: {
    emoji: '๐',
    description: 'Add or update documentation',
    release: false
  },
  refactor: {
    emoji: '๐',
    description: 'Refactor code',
    release: false
  },
  test: {
    emoji: '๐งช',
    description: 'Add or update test',
    release: false
  },
  build: {
    emoji: '๐จ',
    description: 'Add or update build scripts',
    release: false
  }
}
