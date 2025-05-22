export default function EntitySpace() {
  const {setInstances, response, instances, canvasState} = useViewer()

  // UseEffect for adding models once outputs change
  useEffect(() => {
    let newInstances = [];
    let idGenerator = 0;

    console.log(instances)

    // Loop over each key in outputs
    Object.entries(response).forEach(([resultKey, data]) => {
      // - Check if there's a handler for this resultKey
      const handler = mapModels[resultKey];
      if (!handler) return;

      // - Call the model-specific handler to get an array of instances
      const resultInstances = handler(data, canvasState, idGenerator);

      // - Increase the idGenerator so we don't reuse IDs
      idGenerator += resultInstances.length;
      newInstances = [...newInstances, ...resultInstances];
    });

    setInstances(newInstances);
  }, [canvasState, response]);


  return (
    <>
      {instances.map((instance, idx) => {
        const { id, component, configs } = instance;

        // Ensure has at least one item
        if (instance.length === 0) {
          console.error("Invalid instance structure at index", idx, instance);
          return null;
        }

        // Ensure configs and component are valid
        if (!configs || typeof configs.visible === "undefined") {
          console.error("Instance configs are invalid for item", idx, instance);
          return null;
        }

        // Only render if visible
        return configs.visible ? (
          <React.Fragment key={id}>
            {component}
          </React.Fragment>
        ) : null;
      })}
    </>
  );
}