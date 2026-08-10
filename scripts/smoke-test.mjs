import assert from 'node:assert/strict';

const baseUrl = process.env.APP_URL ?? 'http://127.0.0.1:3000';
const apiUrl = `${baseUrl}/api/pomodoro`;
let createdId;

async function expectJson(response, status) {
  if (response.status !== status) {
    throw new Error(
      `Expected HTTP ${status}, received ${response.status}: ${await response.text()}`
    );
  }
  return response.json();
}

try {
  const health = await expectJson(await fetch(`${baseUrl}/api/health`), 200);
  assert.equal(health.status, 'ok');

  const marker = `ci-smoke-${crypto.randomUUID()}`;
  const created = await expectJson(
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task: marker,
        memo: 'created by the CI smoke test',
        date: { month: '8', day: '11' },
      }),
    }),
    201
  );
  createdId = created.id;

  const fetched = await expectJson(await fetch(`${apiUrl}/${createdId}`), 200);
  assert.equal(fetched.task, marker);

  const updated = await expectJson(
    await fetch(`${apiUrl}/${createdId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task: marker,
        memo: 'updated by the CI smoke test',
        date: { month: '8', day: '12' },
      }),
    }),
    200
  );
  assert.equal(updated.memo, 'updated by the CI smoke test');
  assert.equal(updated.day, 12);

  const pomodoros = await expectJson(await fetch(apiUrl), 200);
  assert.ok(pomodoros.some((pomodoro) => pomodoro.id === createdId));

  const deleted = await fetch(`${apiUrl}/${createdId}`, { method: 'DELETE' });
  assert.equal(deleted.status, 204, await deleted.text());
  createdId = undefined;

  const missing = await fetch(`${apiUrl}/${created.id}`);
  assert.equal(missing.status, 404, await missing.text());

  console.log('Docker health and CRUD smoke test passed.');
} finally {
  if (createdId !== undefined) {
    await fetch(`${apiUrl}/${createdId}`, { method: 'DELETE' }).catch(() => undefined);
  }
}
