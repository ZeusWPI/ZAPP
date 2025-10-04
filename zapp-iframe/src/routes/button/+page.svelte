
<script lang="ts">
    import icon from '$lib/assets/openbutton_beta1.svg';
	import { onMount } from 'svelte';
    let open = $state(false);

	
	
	
</script>

<div class={'zappbutton ' + (open ? 'rotated' : '')} style="width: 2.8em; aspect-ratio: 1 / 1;">
	<button
		type="button"
		class="inline-flex justify-center items-center rounded-lg text-white font-bold text-xl shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
		id="menu-button"
		style="width: 100%; height: 100%"
		part="openbutton"
		aria-expanded={true}
        aria-label="zapp button"
		aria-haspopup="true"
		onclick={() => {
			open = !open;
			// var data = { foo: 'bar' }
			// var event = new CustomEvent('myCustomEvent', { detail: data })
			// window.parent.document.dispatchEvent(event)
			window.parent.postMessage(JSON.stringify({type: "buttonclick", state: open}), "http://localhost:3000")
		}}
	>
		<img style="width: 100%; aspect-ratio: 1;" part="zappicon" src={icon} alt="zapp button" />
	</button>
</div>

<style>
	@import '$lib/styles/zapp-v01.css';
</style>
