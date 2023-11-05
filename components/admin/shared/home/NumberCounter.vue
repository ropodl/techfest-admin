<template>
  <div>
    <ClientOnly>
      s
      <AnimatedCounter :value="500" :duration="1000" class="counter" />
    </ClientOnly>
  </div>
</template>
