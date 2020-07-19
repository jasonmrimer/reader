import { CompletionCount } from './CompletionCount';
import { InterfaceName } from '../session/InterfaceName';

export const completionCountsStub = [
  new CompletionCount(InterfaceName.BASELINE, 1),
  new CompletionCount(InterfaceName.RSVP_BASIC, 2),
  new CompletionCount(InterfaceName.RSVP_PROGRESS_BAR, 0),
  new CompletionCount(InterfaceName.RSVP_SECTION_MARK, 0),
  new CompletionCount(InterfaceName.RSVP_SUBWAY, 3),
];

export const completionCountsJson = [
  {
    "_id": "baseline",
    "count": 1
  },
  {
    "_id": "rsvp-basic",
    "count": 2
  },
  {
    "_id": "rsvp-subway",
    "count": 3
  }
]
