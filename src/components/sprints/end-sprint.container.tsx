import * as React from 'react';
import { EndSprint } from './';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { completeSprint } from '../../lib/mutations';
import { getAllSprints, incompleteSprints, completeSprints } from '../../lib/queries';
import { useRouter } from 'next/router';

export interface IEndSprintContainerProps {
  id: number;
}
 
const EndSprintContainer: React.FC<IEndSprintContainerProps> = ({
  id,
}) => {

  const client = useApolloClient();
  const router = useRouter();

  const [completeSprintMutation] = useMutation(completeSprint, {
    client,
    refetchQueries: [
      {
        query: getAllSprints,
      },
      {
        query: incompleteSprints,
      },
      {
        query: completeSprints,
      }
    ]
  });

  const handleOnEndSprint = async () => {
    await completeSprintMutation({
      variables: {
        id: +id,
      }
    });

    router.push('/sprint');
  };
  
  return (
    <EndSprint
      onEndSprintClick={handleOnEndSprint}
    />
  );
}
 
export default EndSprintContainer;