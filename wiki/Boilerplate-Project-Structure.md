The React boilerplate uses a `feature` based project structure. This structure is strongly recommended by the [Redux Style Guide](https://redux.js.org/style-guide/style-guide#structure-files-as-feature-folders-with-single-file-logic). As an example folder structure might look like:

```
src/
  |-index.tsx (Entry point file that renders the React component tree)
  |
  |-app/
  |   |-redux/ (store setup)
  |   |-App.tsx (root React component)
  |
  |-common/ (hooks, generic components, utils, etc)
  |
  |-features/ (contains all "feature folders")
      |-auth/ (a single feature folder )
          |-Login.tsx (a feature specific component)
          |-authSlice.ts (Redux reducer logic and associated actions)
```

Where

- `app/` contains app-wide setup and layout that depends on all the other folders.
- `common/` contains truly generic and reusable utilities and components.
- `features/` has folders that contain all functionality related to a specific feature.
