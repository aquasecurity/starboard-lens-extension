import React from "react";
import { act, render } from "@testing-library/react";

import { Props, VulnerabilitiesList } from "./vulnerabilities-list";

// Component dependency
import { Vulnerability } from "../vulnerability-report";

/**
 *
 * Unit Testing
 * Component is stateless
 */

describe("Vulnerabilities List Component", () => {
  // Prepare mock props
  // in random order
  let mockVulnerabilities: Vulnerability[] = [
    "medium",
    "low",
    "unknown",
    "high",
    "critical",
  ].map((severity) => {
    return new Vulnerability({
      severity,
      vulnerabilityID: "MOCK",
      resource: "MOCK",
      installedVersion: "0.0.0",
      title: "MOCK",
      fixedVersion: "0.0.0",
      links: ["http://www.google.com"],
    });
  });

  const props: Props = { vulnerabilities: mockVulnerabilities };

  describe("Rendering", () => {
    act(() => {
      // Make sure the component renders first
      it("Should Return a container", () => {
        const { container } = render(
          <VulnerabilitiesList vulnerabilities={props.vulnerabilities} />
        );

        expect(container).toBeDefined();
      });
    });

    act(() => {
      // Test if vulnerabilities are ordered from critical to unknown
      it("Should display vulnerabilities in order", () => {
        const order = ["critical", "high", "medium", "low", "unknown"];

        const r = render(<VulnerabilitiesList {...props} />);

        const severities = r.getAllByTestId("severity");

        severities.forEach((severity, i) => {
          expect(severity.innerHTML).toEqual(order[i]);
        });
      });
    });
  });
});
