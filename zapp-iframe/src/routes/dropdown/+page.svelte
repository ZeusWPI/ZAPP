<script lang="ts">
	import Dropdown from '$lib/components/Dropdown.svelte';
	import { onMount } from 'svelte';
	let loadimages = $state(false);

	onMount(() => {
		window.onmessage = function (e) {
			try {
				let msg = e.data;
				if (msg.type === 'state') {
					loadimages = true;
				}else if(msg.type === "outsideclick"){

				} else {
					console.error('no supported msg type: ' + msg.type);
				}
			} catch (err) {
				console.error(err);
			}
		};
	});
</script>

<div id="dropdown">
	<Dropdown {loadimages} />
</div>

<style>
	@import '$lib/styles/zapp-v01.css';
</style>
