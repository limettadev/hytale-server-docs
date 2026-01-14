import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Hytale Docs by limetta',
  description: 'Documentation for the HytaleServer plugin API by limetta',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Concepts', link: '/concepts/events' },
      { text: 'Reference', link: '/reference/events/damage' },
      { text: 'API', link: '/api/' }
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Creating a Plugin', link: '/getting-started/plugin' }
        ]
      },
      {
        text: 'Concepts',
        collapsed: false,
        items: [
          { text: 'ECS Architecture', link: '/concepts/ecs' },
          { text: 'Event System', link: '/concepts/events' },
          { text: 'Components', link: '/concepts/components' },
          { text: 'System Groups', link: '/concepts/system-groups' }
        ]
      },
      {
        text: 'Reference: Events',
        collapsed: false,
        items: [
          { text: 'Damage', link: '/reference/events/damage' },
          { text: 'Death', link: '/reference/events/death' },
          { text: 'Respawn', link: '/reference/events/respawn' },
          { text: 'Player Join', link: '/reference/events/player-join' },
          { text: 'Entity Spawn', link: '/reference/events/entity-spawn' },
          { text: 'Block Break & Place', link: '/reference/events/block-break-place' },
          { text: 'Player Chat', link: '/reference/events/player-chat' }
        ]
      },
      {
        text: 'Reference: Components',
        collapsed: false,
        items: [
          { text: 'Player', link: '/reference/components/player' },
          { text: 'TransformComponent', link: '/reference/components/transform' },
          { text: 'Inventory', link: '/reference/components/inventory' }
        ]
      },
      {
        text: 'Reference: Systems',
        collapsed: false,
        items: [
          { text: 'World Management', link: '/reference/systems/worlds' }
        ]
      },
      {
        text: 'API Reference',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/api/' },
          { text: 'ItemStack', link: '/api/ItemStack' },
          { text: 'Inventory', link: '/api/Inventory' },
          { text: 'Player', link: '/api/Player' },
          { text: 'TransformComponent', link: '/api/TransformComponent' },
          { text: 'Damage', link: '/api/Damage' },
          { text: 'DamageModule', link: '/api/DamageModule' },
          { text: 'DamageSystems', link: '/api/DamageSystems' },
          { text: 'DeathComponent', link: '/api/DeathComponent' },
          { text: 'DeathSystems', link: '/api/DeathSystems' },
          { text: 'RespawnSystems', link: '/api/RespawnSystems' },
          { text: 'DamageCause', link: '/api/DamageCause' },
          { text: 'EntityStatMap', link: '/api/EntityStatMap' },
          { text: 'JavaPlugin', link: '/api/JavaPlugin' },
          { text: 'PlayerRef', link: '/api/PlayerRef' },
          { text: 'NPCEntity', link: '/api/NPCEntity' },
          { text: 'Message', link: '/api/Message' },
          { text: 'RefSystem', link: '/api/RefSystem' },
          { text: 'RefChangeSystem', link: '/api/RefChangeSystem' },
          { text: 'EntityEventSystem', link: '/api/EntityEventSystem' },
          { text: 'EntityTickingSystem', link: '/api/EntityTickingSystem' },
          { text: 'Query', link: '/api/Query' },
          { text: 'CommandBuffer', link: '/api/CommandBuffer' },
          { text: 'Store', link: '/api/Store' },
          { text: 'Ref', link: '/api/Ref' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/limettadev/hytale-server-docs' },
      { icon: 'discord', link: 'https://limetta.dev/discord' }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3]
    },
    footer: {
      message: 'Unofficial documentation · Any questions? Found a mistake? Have something you want documented? Join the Discord server at the top and let us know in #hytale!',
      copyright: '© 2026 Limetta',
    },
  },
  sitemap: {
    hostname: 'https://hytale.limetta.dev'
  }
})
