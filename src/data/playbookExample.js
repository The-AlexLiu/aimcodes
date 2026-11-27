import { playbookAgents } from './playbookAgents.js'

export const ASCENT_EXAMPLE_HASH = '#ascent-example'

export function createAscentExample() {
  const jett = playbookAgents.find((agent) => agent.id === 'jett')
  return {
    version: 3,
    mapId: 'ascent',
    notes: '',
    boards: {
      ascent: [
        { id: 'route', type: 'arrow', color: '#19d3da', points: [{ x: 850, y: 355 }, { x: 911, y: 350 }] },
        { id: 'jett', type: 'agent', agentId: jett.id, name: jett.name, asset: jett.asset, side: 'attacker', x: 809, y: 354 },
        { id: 'spike', type: 'marker', markerType: 'spike', x: 909, y: 299 },
      ],
    },
  }
}
