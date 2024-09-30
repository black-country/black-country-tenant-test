import Driver from 'driver.js';

declare module '#app' {
  interface NuxtApp {
    $driver: Driver;
  }
}
