import * as anchor from "@coral-xyz/anchor";

interface StakingConfiguration {
  end_date: anchor.BN | null;
  apy_changes: ApyChangeRecord[];
}
interface MultiplierRecord {
  multiplier: number;
  minRewardAge: number;
}

interface MultiplierAccount {
  multiplier_records: MultiplierRecord[];
}

interface ApyChangeRecord {
  apr_change_timestamp: anchor.BN;
  new_apr: number;
}

interface UserStakeAccount {
  // lockin_period?: number;
  last_synced: anchor.BN;
  current_apr: number;
  total_points: anchor.BN;
  stake_amount: anchor.BN;
  stake_start_time: anchor.BN;
  get_multiplier: (
    multiplier_acc: MultiplierAccount,
    rewardAge: number,
  ) => number;
}

export type {
  StakingConfiguration,
  MultiplierRecord,
  MultiplierAccount,
  ApyChangeRecord,
  UserStakeAccount,

};
