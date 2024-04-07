<script lang="ts">
  import { POST_REACTION_EMOTES } from '@/lib/configs/index.js';

  type Reaction = {
    reaction: string;
    count: number;
    reacted: boolean;
  };

  export let action: string = '';

  export let slug: string;

  export let reactions: Record<string, Reaction> = {};

  let reacted_to = '';
  let _reactions: Record<string, Reaction> = {};

  for (const reaction of POST_REACTION_EMOTES) {
    if (reaction in reactions) {
      _reactions[reaction] = reactions[reaction]!;
      if (reactions[reaction]!.reacted) {
        reacted_to = reaction;
      }
    } else {
      _reactions[reaction] = {
        reaction,
        count: 0,
        reacted: false
      };
    }
  }

  let submitting = false;

  async function on_submit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault();
    if (submitting) {
      return;
    }
    const new_reaction = event.currentTarget['reaction'].value;
    if (new_reaction === reacted_to) {
      return;
    }

    submitting = true;
    const res = await fetch(action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        slug,
        reaction: new_reaction
      })
    }).catch((err) => {
      console.error(err);
      return undefined;
    });

    submitting = false;
    if (!res || !res.ok) {
      console.error('Failed to submit reaction', res);
      return;
    }

    let current = _reactions[reacted_to];
    if (current) {
      current.reacted = false;
      if (current.count > 0) {
        current.count -= 1;
      }
    }

    reacted_to = new_reaction;
    current = _reactions[reacted_to];
    if (current) {
      current.reacted = true;
      current.count += 1;
    }

    _reactions = _reactions;
  }
</script>

<div class="flex flex-wrap justify-center">
  {#each Object.values(_reactions) as reaction (reaction.reaction)}
    <form method="post" {action} on:submit={on_submit}>
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="reaction" value={reaction.reaction} />
      <button type="submit" class="btn btn-ghost {reaction.reacted ? 'bg-primary/10' : ''}">
        <span class="inline-block text-base transition-transform" class:scale-125={reaction.reacted}
          >{reaction.reaction} {reaction.count || ''}</span
        >
      </button>
    </form>
  {/each}
</div>
