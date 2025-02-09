#!/usr/bin/env node

require('dotenv').config();

const jwt = require('jsonwebtoken');
const knex = require('../src/db');
const ApiToken = require('../src/models/api_token');

(async () => {
  try {
    const inquirerModule = require('inquirer');
    const inquirer = inquirerModule.default || inquirerModule;

    const groups = await knex('group').select('group_id', 'name');
    if (!groups || groups.length === 0) {
      console.error('No groups found in the database.');
      process.exit(1);
    }

    const groupChoices = groups.map((group) => ({
      name: group.name,
      value: group.group_id,
    }));

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'group_id',
        message: 'Select the group for which you want to generate the token:',
        choices: groupChoices,
      },
    ]);

    const { group_id } = answers;

    const expiresIn = '1y';

    const payload = { group_id };

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error('Error: JWT_SECRET is not defined in your .env file.');
      process.exit(1);
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn });

    const issuedAt = new Date();
    const expiredAt = new Date(issuedAt);
    expiredAt.setFullYear(expiredAt.getFullYear() + 1);

    const savedToken = await ApiToken.create({
      group_id,
      jwt_token: token,
      issued_at: issuedAt.toISOString(),
      expired_at: expiredAt.toISOString(),
    });

    console.log('\nGenerated JWT token:\n');
    console.log(token);
    console.log('\nToken record saved to database:');
    console.log(savedToken);

    process.exit(0);
  } catch (error) {
    console.error('Error generating token:', error);
    process.exit(1);
  }
})();
