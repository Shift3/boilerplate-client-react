import { User } from 'common/models';
import { Rule } from '../rules';

export const evaluateRule = (rule: Rule, user: User, data?: unknown): boolean => {
  if (typeof rule === 'function') {
    return rule(user, data);
  }

  return rule;
};
