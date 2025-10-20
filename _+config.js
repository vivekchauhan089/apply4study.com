export default {
  prerender: true,
  passToClient: ['documentProps'],
  meta: {
    title: {
      default: 'Apply4Study',
      template: '%s — Apply4Study',
      // ✅ Required: define env as an object, not an array
      env: {
        config: true,   // replace 'production' / 'development' array with config, server, or client keys
      }
    },
    description: {
      default: 'Study abroad and career guidance portal',
      env: {
        config: true   // optional but recommended
      }
    }
  }
}
