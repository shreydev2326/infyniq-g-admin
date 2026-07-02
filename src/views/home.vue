<script setup>
import StatsCards from '@/components/home_sections/statscard.vue'
import VisitorSection from '@/components/home_sections/visitorsection.vue'
import LeadsAndSessions from '@/components/home_sections/leadandsessions.vue'
import InquiriesAndAI from '@/components/home_sections/inquires&AI.vue'
</script>
<template>
  <div class="space-y-6 p-6">
    <StatsCards />
    <VisitorSection />
    <LeadsAndSessions />
    <InquiriesAndAI />
  </div>
</template>