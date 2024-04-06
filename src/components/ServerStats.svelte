<script lang="ts">
  // import IconBot from '@/assets/icons/bot.svg?raw';
  import IconServerOff from '@/assets/icons/server-off.svg?raw';
  import IconUserOnline from '@/assets/icons/user-online.svg?raw';
  import IconUserPlus from '@/assets/icons/user-plus.svg?raw';
  import IconUser from '@/assets/icons/user.svg?raw';
  import IconVolume2 from '@/assets/icons/volume-2.svg?raw';
  import type { TServerStats } from '@/server/dsserver';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  export let stats: TServerStats | undefined;

  const message_in = { x: '-250px', duration: 500, delay: 500 };
  const message_out = { x: '250px', duration: 500 };

  const MESSAGE_ROTATION_INTERVAL = 1000 * 5;

  let messages = !stats
    ? [
        {
          name: 'Server stats unavailable',
          value: '',
          icon: IconServerOff
        }
      ]
    : [
        {
          name: 'Total members',
          value: stats.members_count,
          icon: IconUser
        },
        {
          name: 'Online members',
          value: stats.members_online,
          icon: IconUserOnline
        },
        {
          name: 'Connected members',
          value: stats.members_connected,
          icon: IconVolume2
        },
        {
          name: "Week's new members",
          value: stats.members_last_week,
          icon: IconUserPlus
        },
        {
          name: "Today's new members",
          value: stats.members_last_day,
          icon: IconUserPlus
        }
        // {
        //   name: 'Total bots',
        //   value: stats.bots_count,
        //   icon: IconBot
        // }
      ];

  let message_idx = 0;
  $: message = messages[message_idx]!;

  onMount(() => {
    let intervalId = setInterval(() => {
      message_idx = (message_idx + 1) % messages.length;
    }, MESSAGE_ROTATION_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  });
</script>

<div class="overflow-hidden pb-4 pt-1">
  <div class="flex h-32 justify-center">
    {#key message}
      <div
        in:fly={message_in}
        out:fly={message_out}
        class="stats bg-base-100 shadow-lg shadow-black/80 ring-1 ring-black/80"
      >
        <div class="my-auto flex min-w-48 flex-col items-center px-8">
          <div class="flex gap-2 text-4xl font-extrabold">
            {message.value}
            <div class="my-auto inline-block size-8" class:-mr-4={message.value}>{@html message.icon}</div>
          </div>
          <div class="mt-[0.75em] font-semibold">{message.name}</div>
        </div>
      </div>
    {/key}
  </div>
</div>
