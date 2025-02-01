import { IDEAS_QUERYResult } from '@/sanity/types';

import IdeaCard from './IdeaCard';

interface IdeaListProps {
  ideas: IDEAS_QUERYResult;
}

const IdeaList = ({ ideas }: IdeaListProps) => {
  return (
    <ul className="card_grid mt-7">
      {ideas.length > 0 ? (
        ideas.map(idea => <IdeaCard key={idea.id} idea={idea} />)
      ) : (
        <p className="no-result">No ideas found</p>
      )}
    </ul>
  );
};

export default IdeaList;
