process.stdout.write('Map keys in object')

const assert = require('assert')
const mapKeys = require('.')
const options = {
  login: 'foo',
  // eslint-disable-next-line camelcase
  html_url: 'https://example.org/users/foo',
  // eslint-disable-next-line camelcase
  avatar_url: 'https://example.org/avatars/foo',
}

const mappedOptions = mapKeys({
  in: options,
  mappings: [
    {from: 'login', to: 'username'},
    {from: ['web_url', 'html_url'], to: 'website'},
    {from: ['avatar_url', 'links.avatar.href'], to: 'avatarUrl'},
  ],
})


assert.deepStrictEqual(
  mappedOptions,
  {
    username: 'foo',
    website: 'https://example.org/users/foo',
    avatarUrl: 'https://example.org/avatars/foo',
  }
)

console.info(' ✔')
