/** Submission readiness is separate from the live MCP protocol contract. */
export function reviewBlockers(evidence, review) {
  const blockers = [];
  for (const group of ['positive', 'negative']) {
    const cases = review.test_cases[group];
    const observed = evidence.native_cases?.[group] ?? [];
    cases.forEach((test, index) => {
      const result = observed[index];
      if (result?.prompt !== test.prompt || result.status !== 'passed') {
        blockers.push(`${group} case ${index + 1} needs a passing native result for the current prompt`);
      }
    });
  }
  if (evidence.demo?.status !== 'verified' || evidence.demo.url !== review.demo_recording_url) {
    blockers.push('Current demo recording must be accessible and verified');
  }
  if (evidence.portal?.authentication !== 'passed') blockers.push('Submission portal authentication is incomplete');
  if (evidence.portal?.mcp_scan !== 'passed') blockers.push('Submission portal MCP scan has not passed');
  if (evidence.portal?.secured_reviewer_credentials !== 'saved') blockers.push('Working reviewer credentials must be saved in private Review details');
  return blockers;
}
