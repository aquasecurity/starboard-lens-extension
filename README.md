# Starboard Lens Extension

> This is a [Lens][lens] extension for [Starboard][starboard] which provides visibility into
> vulnerability assessment reports for Kubernetes workloads stored as [custom security resources][starboard-crds].

[![GitHub Build Actions][build-action-img]][actions]
[![License][license-img]][license]

[![Screenshot](docs/images/starboard-lens-extension-video.png)](https://youtu.be/X-bhVwmp2l4)

## Installation

### Prerequisites

* Lens >= 4.0.0-beta.4 should first be installed. Download a pre-built package from the [releases][lens-releases] page.
  Alternatively, on macOS installing the latest version is as simple as `brew cask install lens`. For installation
  instructions on other operating systems and packages managers, see [Lens Installation][lens-installation].

### From Source (Linux, macOS)

Building from source is a bit of work, but currently it's the only way to install the latest version of the extension.

You must have a working Node.js environment.

```
$ mkdir -p ~/.k8slens/extensions
$ git clone https://github.com/aquasecurity/starboard-lens-extension.git ~/.k8slens/extensions/starboard-lens-extension
$ cd ~/.k8slens/extensions/starboard-lens-extensions
$ npm install && npm run build
```

Open Lens application and select a cluster. If everything went well you should see the following items in the main
navigation menu:

- VulnerabilityReports

  ![](./docs/images/lens_vulnerability_report.png)
- ConfigAuditReports

  ![](./docs/images/lens_configaudit_report.png)
- CISKubeBenchReports

[lens]: https://github.com/lensapp/lens
[starboard]: https://github.com/aquasecurity/starboard
[starboard-crds]: https://github.com/aquasecurity/starboard#custom-security-resources-definitions

[lens-installation]: https://github.com/lensapp/lens#installation
[lens-releases]: https://github.com/lensapp/lens/releases
[build-action-img]: https://github.com/aquasecurity/starboard-lens-extension/workflows/Build/badge.svg
[actions]: https://github.com/aquasecurity/starboard-lens-extension/actions
[license]: https://github.com/aquasecurity/starboard-lens-extension/blob/master/LICENSE
[license-img]: https://img.shields.io/github/license/aquasecurity/starboard-lens-extension
