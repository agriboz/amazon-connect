export default {
  AgentStates: () => import('@/components/Widgets/AgentStates'),
  AgentList10: () => import('@/components/Widgets/AgentList10'),
  AgentList20: () => import('@/components/Widgets/AgentList20'),
  AgentList40: () => import('@/components/Widgets/AgentList40'),
  CallsAnsweredHourly: () => import('@/components/Widgets/CallsAnsweredHourly'),
  CallsInQueue: () => import('@/components/Widgets/CallsInQueue'),
  CallsReceived: () => import('@/components/Widgets/CallsReceived'),
  CallsReceivedAnswered: () =>
    import('@/components/Widgets/CallsReceivedAnswered'),
  CallsReceivedAnsweredAbandoned: () =>
    import('@/components/Widgets/CallsReceivedAnsweredAbandoned'),
  OldestInQueue: () => import('@/components/Widgets/OldestInQueue'),
  SlaTodayChart: () => import('@/components/Widgets/SlaTodayChart'),
  SlaTodayText: () => import('@/components/Widgets/SlaTodayText'),
  ScrollingMessages: () => import('@/components/Widgets/ScrollingMessages')
}
