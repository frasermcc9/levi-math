import * as prompts from 'prompts';
import { green, red } from 'colors';
import { mkdir, rm } from 'fs/promises';
import { execSync } from 'child_process';

const PROMPT_MESSAGE =
  'Are you sure you want to create a new seed for the database? The current database state will be used in future seeding. This information IS committed to the repo.';

(async () => {
  const { confirmed } = await prompts({
    type: 'confirm',
    name: 'confirmed',
    message: PROMPT_MESSAGE,
  });

  if (!confirmed) {
    console.log(red('Database seed setup cancelled.'));
    return;
  }

  await rm(__dirname + '/dump', { force: true, recursive: true });
  await mkdir(__dirname + '/dump', { recursive: true });

  execSync(`mongodump -d timesheet -o ${__dirname}/dump`);

  console.log(green('New database seed created!'));
})();
