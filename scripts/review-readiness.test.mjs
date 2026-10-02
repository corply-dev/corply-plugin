import test from 'node:test';
import assert from 'node:assert/strict';
import { reviewBlockers } from './review-readiness.mjs';
const review = {test_cases:{positive:[{prompt:'Connect'}],negative:[{prompt:'Do not pay'}]},demo_recording_url:'https://example.com/demo.mp4'};
const ready = () => ({native_cases:{positive:[{prompt:'Connect',status:'passed'}],negative:[{prompt:'Do not pay',status:'passed'}]},demo:{status:'verified',url:review.demo_recording_url},portal:{authentication:'passed',mcp_scan:'passed',secured_reviewer_credentials:'saved'}});
test('A live contract cannot substitute for private portal authentication or credentials',()=>{
  const e=ready(); e.portal={authentication:'unavailable',mcp_scan:'failed',secured_reviewer_credentials:'unavailable'};
  assert.equal(reviewBlockers(e,review).length,3);
});
test('Changed prompts and stale demo URLs invalidate prior review evidence',()=>{
  const e=ready();e.native_cases.positive[0].prompt='Old prompt';e.demo.url='https://example.com/old.mp4';
  assert.equal(reviewBlockers(e,review).length,2);
});
test('A complete matching evidence record has no independent preparation blockers',()=>assert.deepEqual(reviewBlockers(ready(),review),[]));
