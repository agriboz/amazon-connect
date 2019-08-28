<template>
  <div class="container-fluid">
    <sla-today-text />
    <!-- <sla-today-chart /> -->
    <!-- <calls-answered-hourly /> -->
    <!-- <calls-received-answered /> -->
    <!-- <calls-received /> -->
    <!-- <calls-received-answered-abandoned /> -->
    <!-- <agent-states /> -->

    <!-- <calls-in-queue />

    <oldest-in-queue /> -->
  </div>
  <!-- container -->
</template>

<script>
import SlaTodayText from '@/components/Widgets/SlaTodayText'
// import SlaTodayChart from '@/components/Widgets/SlaTodayChart'
// import CallsAnsweredHourly from '@/components/Widgets/CallsAnsweredHourly'
// import CallsReceivedAnswered from '@/components/Widgets/CallsReceivedAnswered'
// import CallsReceived from '@/components/Widgets/CallsReceived'
// import CallsReceivedAnsweredAbandoned from '@/components/Widgets/CallsReceivedAnsweredAbandoned'
// import AgentStates from '@/components/Widgets/AgentStates'
// import CallsInQueue from '@/components/Widgets/CallsInQueue'
// import OldestInQueue from '@/components/Widgets/OldestInQueue'

export default {
  layout: 'authenticated',
  components: {
    SlaTodayText
    // SlaTodayChart
    // CallsAnsweredHourly
    // AgentStates
    // CallsInQueue,
    // OldestInQueue
    // CallsReceivedAnsweredAbandoned
    // CallsReceived,
    // CallsReceivedAnswered
  }
}
</script>
