# Starboard Lens Extension

> This is a [Lens][lens] extension for [Starboard][starboard] which provides visibility into
> vulnerability assessment reports for Kubernetes workloads stored as [custom security resources][starboard-crds].

[![GitHub Release][release-img]][releases]
[![GitHub Build Actions][build-action-img]][actions]
[![License][license-img]][license]
[![GitHub All Releases][github-all-releases-img]][releases]

[![Screenshot](docs/images/starboard-lens-extension-video.png)](https://youtu.be/X-bhVwmp2l4)

## Installation

This guide shows how to install the extension either from from pre-built binary releases or source.

### Prerequisites

* Lens >= [4.0][min-lens] should first be [installed][lens-installation].
* Follow Starboard [Getting Started][starboard-getting-started] guide to understand how Starboard is
  initialized and how it generates security reports, which are then stored as custom resources.

### Compatibility Matrix

The following matrix indicates versions of this extension and compatible Lens releases.

| Lens | Extension |
|------|-----------|
| 5.0  | [0.1.0](https://github.com/aquasecurity/starboard-lens-extension/releases/tag/v0.1.0) |
| 4.0  | [0.0.2](https://github.com/aquasecurity/starboard-lens-extension/releases/tag/v0.0.2) |
| 4.0  | [0.0.1](https://github.com/aquasecurity/starboard-lens-extension/releases/tag/v0.0.1) |

### From the Binary Releases

Every [release][releases] of Lens extension for Starboard provides the tarball-file that can be manually
downloaded and installed. Alternatively, you can copy the download URL of the release artifact to paste it in the
**Manage Lens Extensions** page.

1. Download your desired version from GitHub [release][release] page or GitHub
   [package registry][package-registry]. Alternatively, just copy the download URL of the release artifact.
2. Open Lens application and select **Lens** menu, and then click **Extensions** item, or press
   <kbd>Shift</kbd> + <kbd>Command</kbd> + <kbd>E</kbd> to open the **Manage Lens Extensions** page.
3. Specify the path (.tar, .tgz) or download URL to the extension package and click **Install**.
   ![](docs/images/extensions-ui-install.png)
4. If everything is fine, you'll see the `@aquasecurity/starboard-lens-extension` extension listed under
   **Installed Extensions**. Click **Enable** to enable it.
   ![](docs/images/extensions-ui-enable.png)
5. Close the **Manage Lens Extensions** page and verify that the **Starboard** menu item shows up in the main menu.
   ![](docs/images/starboard-extension-verify.png)

### From Source (Linux, macOS)

Building from source is slightly more involved, but it's the best way to go if you want to test the latest (pre-release)
version of the extension.

You must have a working Node.js environment.

1. Clone the source code to the `~/.k8slens/extensions/starboard-lens-extensions` directory and build the extension's package:
   ```
   $ mkdir -p ~/.k8slens/extensions
   $ git clone https://github.com/aquasecurity/starboard-lens-extension.git ~/.k8slens/extensions/starboard-lens-extension
   $ cd ~/.k8slens/extensions/starboard-lens-extensions
   $ npm install && npm run build
   ```
2. Open Lens application and select **Lens** menu, and then click **Extensions** item, or press
   <kbd>Shift</kbd> + <kbd>Command</kbd> + <kbd>E</kbd> to open the **Manage Lens Extensions** page.
3. If everything goes fine, you'll see the `@aquasecurity/starboard-lens-extension` extension listed under
   **Installed Extensions**. Click **Enable** to enable it.
   ![](docs/images/extensions-ui-enable.png)

## Getting Started

> **NOTE**: As the source code of the extension is evolving very fast, some screenshots shown below
> may be outdated. We'll also update this section with more examples.

- VulnerabilityReports

  ![](./docs/images/lens_vulnerability_report.png)
- ConfigAuditReports

  ![](./docs/images/lens_configaudit_report.png)
- CISKubeBenchReports

[lens]: https://github.com/lensapp/lens
[starboard]: https://github.com/aquasecurity/starboard
[starboard-crds]: https://aquasecurity.github.io/starboard/latest/crds/
[starboard-getting-started]: https://github.com/aquasecurity/starboard#getting-started

[lens-installation]: https://github.com/lensapp/lens#installation
[lens-releases]: https://github.com/lensapp/lens/releases
[release-img]: https://img.shields.io/github/release/aquasecurity/starboard-lens-extension.svg?logo=github
[releases]: https://github.com/aquasecurity/starboard-lens-extension/releases
[github-all-releases-img]: https://img.shields.io/github/downloads/aquasecurity/starboard-lens-extension/total?logo=github
[package-registry]: https://github.com/aquasecurity/starboard-lens-extension/packages/520430
[build-action-img]: https://github.com/aquasecurity/starboard-lens-extension/workflows/Build/badge.svg
[actions]: https://github.com/aquasecurity/starboard-lens-extension/actions
[license]: https://github.com/aquasecurity/starboard-lens-extension/blob/master/LICENSE
[license-img]: https://img.shields.io/github/license/aquasecurity/starboard-lens-extension

[min-lens]: https://github.com/lensapp/lens/releases/tag/v4.0.0
