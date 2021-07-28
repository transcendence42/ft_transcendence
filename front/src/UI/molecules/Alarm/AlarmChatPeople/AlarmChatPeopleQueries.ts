import { gql } from '@apollo/client';

export const TOGGLE_BLOCK = gql`
  mutation toggleBlock($blockInput: BlockInput!) {
    toggleBlock(blockInput: $blockInput) {
      checked
      blocked
    }
  }
`;
