import Reactotron from 'reactotron-react-native';
import {
  QueryClientManager,
  reactotronReactQuery,
} from 'reactotron-react-query';
import { queryClient } from '@/infra/adapters/query/react-query';

const queryClientManager = new QueryClientManager({
  queryClient,
});

// biome-ignore lint/correctness/useHookAtTopLevel: Setup Reactotron
Reactotron.configure({
  name: 'Digital Nomad App',
  onDisconnect: () => {
    queryClientManager.unsubscribe();
  },
})
  .useReactNative({
    asyncStorage: true,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: true,
    errors: { veto: () => false },
  })
  .use(reactotronReactQuery(queryClientManager))
  .connect();
