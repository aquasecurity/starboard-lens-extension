import { LensMainExtension } from "@k8slens/extensions";

export default class StarboardExtensionMain extends LensMainExtension {
  onActivate() {
    console.log('Starboard extension activated');
  }

  onDeactivate() {
    console.log('Starboard extension de-activated');
  }
}
