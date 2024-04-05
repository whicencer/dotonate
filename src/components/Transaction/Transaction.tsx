import cls from './styles.module.scss';

export function Transaction() {
  return (
    <div className={cls.Transaction}>
      <div className={cls.header}>
        <h2 className={cls.donator}>Donator Name</h2>
        <h3 className={cls.transactionSum}>$71</h3>
      </div>
      <p className={cls.donationMsg}>
        Hello! this is the first donate on this platform. And I want to say,
        that it is the best platform for donation I have ever seen.
      </p>
      <div className={cls.menu}>
        <span className={cls.menuBtn}>Answer</span>
      </div>
    </div>
  );
}
