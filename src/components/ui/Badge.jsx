export function Badge({ level = 'neutral', children }) {
  const classes = {
    normal:   'badge-success',
    warning:  'badge-warning',
    critical: 'badge-danger',
    neutral:  'badge-neutral',
  };

  return (
    <span className={classes[level] ?? classes.neutral}>
      {children}
    </span>
  );
}