<script lang="ts">
  import Editor from "./Editor.svelte";
  import type { WebfishingSave } from "./game/types";
  import { readFile, BinaryReader, BinaryWriter, writeFile } from "./lib/binary";
  import { readVariant, writeVariant } from "./lib/godot";
  import type { GodotVariant } from "./lib/types";

  let save: WebfishingSave | null;
  const year = new Date().getUTCFullYear();

  async function uploadSave(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file != null) {
      const bytes = await readFile(file);
      const reader = new BinaryReader(bytes);
      reader.readUInt32(); // Size, which we don't care about
      save = readVariant(reader) as unknown as WebfishingSave;
      console.log(save);
    }
  }

  function downloadSave() {
    const writer = new BinaryWriter();
    writeVariant(writer, save as unknown as GodotVariant);
    const bytes = writer.toBytes();

    const writer2 = new BinaryWriter();
    writer2.writeUInt32(bytes.length);
    writer2.write(bytes);

    writeFile(writer2.toBytes(), "webfishing_save_slot_0.sav");
  }
</script>

<hgroup>
  <h1>WEBFISHING Save Editor</h1>
  <p>
    By <a href="https://starlight-symposium.neocities.org/">Starlight</a> [<a
      class="font-mono"
      href="https://github.com/enchanted-sword/webfishing-save-editor">GitHub</a
    >]
  </p>

  <small>
    Forked from the <a href="https://github.com/NotNite/webfishing-save-editor">original</a> by
    <a href="https://notnite.com/">NotNite</a>
    and <a href="https://hl2.sh/">Jay</a>
  </small>
</hgroup>

<p>
  Your saves are located at <code class="rounded-md px-1.5 py-0.5 ring-2 ring-inset ring-white/10 bg-white/10"
    >%AppData%\Godot\app_userdata\webfishing_2_newver\webfishing_save_slot_#.sav</code
  >. It's a good idea to back up your saves before editing them!
</p>

<div role="group">
  <input type="file" name="file" accept=".sav" on:change={uploadSave} />

  {#if save}
    <input type="button" value="Download save" on:click={downloadSave} />
  {/if}
</div>

{#if save}
  <div id="editor" class="bg-cream rounded-2xl text-ui font-display px-4 py-1 w-full cursor-default">
    <Editor {save} />
  </div>
{/if}

<footer><h2 class="text-center">© Starlight {year}</h2></footer>
