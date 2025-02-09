<template>
  <NuxtPage />
</template>

<style>
:root:root {
  --van-primary-pink-color: #fb86a7;
  --van-primary-blue-color: #00a1d6;
  --van-primary-color: #fb86a7;
  --van-tab-active-text-color: var(--van-primary-color);
  --van-tabbar-item-active-color: var(--van-primary-pink-color);
  --van-radio-checked-icon-color: var(--van-primary-pink-color);
  --van-address-list-radio-color: var(--van-primary-pink-color);

  .van-tabbar-item--active {
    color: var(--van-primary-pink-color);
  }
  .van-radio_icon--checked {
    background-color: var(--van-primary-pink-color);
    border-color: var(--van-primary-pink-color);
  }
  .van-button--primary {
    background: var(--van-primary-pink-color);
    border: var(--van-primary-blue-color);
  }
}
</style>
