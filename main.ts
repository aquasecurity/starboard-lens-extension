import { Main } from "@k8slens/extensions";

export default class StarboardExtensionMain extends Main.LensExtension {
  onActivate() {
    console.log('Starboard extension activated');
  }

  onDeactivate() {
    console.log('Starboard extension de-activated');
  }
}
