<script lang="ts">
	import Dropdown from '$lib/components/Dropdown.svelte';
	import { onDestroy, onMount } from 'svelte';
	const apps = [
		{ img: 'git.png', url: 'https://git.zeus.gent', tooltip: 'Git', visible: false },
		{
			img: 'zess.svg',
			url: 'https://zess.zeus.gent',
			tooltip: 'ZESS: Kelder logs',
			visible: false
		},
		{
			img: 'Mattermost_icon_denim.svg',
			url: 'https://mattermost.zeus.gent',
			class: 'mattermost',
			tooltip: 'Chat',
			visible: false
		},
		{
			img: 'haldis_black.png',
			url: 'https://haldis.zeus.gent',
			tooltip: 'Haldis: Eten bestellen',
			visible: false
		},
		{ img: 'tap.ico', url: 'https://tap.zeus.gent', tooltip: 'TAP: Drank kopen', visible: false },
		{ img: 'tab.ico', url: 'https://tab.zeus.gent', tooltip: 'TAB: Geld beheren', visible: false },
		{ img: 'zeus.svg', url: 'https://zeus.gent', tooltip: 'Zeus site', visible: false },
		{
			img: 'codimd.png',
			url: 'https://codimd.zeus.gent',
			tooltip: 'CodiMD: Notities',
			visible: false
		},
		{
			img: 'profile_nobg.png',
			url: 'https://zauth.zeus.gent',
			class: 'profile',
			tooltip: 'Zauth profiel',
			visible: false
		}
	];

	let position = $state({ left: 0, top: 0 });
	let open = $state(false);

	let root : HTMLElement;

	let outsideClickHandler = (ev: MouseEvent) => {
		const path = ev.composedPath();
		const clickedInside = path.includes(root) || path.some((n: any) => n && n.id === 'menu-button');
		if (!clickedInside) {
			console.log("CLOSE")
			open = false;
		}
	};



	onMount(() => {
		console.log('mounted');

		window.addEventListener('message', (event) => {
			// if (event.origin !== "http://localhost:3000") return; // security check
			console.log('Child received:', event.data);
			position = { left: event.data.rect.x, top: event.data.rect.y };
			open = true;
		});

		// window.addEventListener("click", outsideClickHandler);
	});

	onDestroy(()=>{
		window.removeEventListener("click", outsideClickHandler);
	})
</script>

<div id="dropdown" bind:this={root}>
	{#if open}
		<Dropdown />
	{/if}
</div>

<style>
	@import '$lib/styles/zapp-v01.css';
</style>
