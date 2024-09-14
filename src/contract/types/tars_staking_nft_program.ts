/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/tars_staking_nft_program.json`.
 */
export type TarsStakingNftProgram = {
  "address": "EDLE5Tnw2x4po1ZGRBYPYVnjKAJAJCJzKFi8RiRuN4xs",
  "metadata": {
    "name": "tarsStakingNftProgram",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addMultiplierRecord",
      "discriminator": [
        198,
        196,
        230,
        73,
        42,
        247,
        137,
        18
      ],
      "accounts": [
        {
          "name": "adminSign",
          "docs": [
            "Signer of the Admin Key"
          ],
          "signer": true
        },
        {
          "name": "adminAcc",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "multiplierAcc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  112,
                  108,
                  105,
                  101,
                  114,
                  95,
                  97,
                  99,
                  99
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "newMultiplierRecord",
          "type": {
            "defined": {
              "name": "multiplierRecord"
            }
          }
        }
      ]
    },
    {
      "name": "batchStake",
      "discriminator": [
        49,
        68,
        55,
        207,
        83,
        130,
        50,
        242
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "stakingConfigAccount",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  105,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "userStakeAccountOne",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "user_configs.get(0)"
              }
            ]
          }
        },
        {
          "name": "userStakeAccountTwo",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "user_configs.get(1)"
              }
            ]
          }
        },
        {
          "name": "userStakeAccountThree",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "user_configs.get(2)"
              }
            ]
          }
        },
        {
          "name": "userStakeAccountFour",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "user_configs.get(3)"
              }
            ]
          }
        },
        {
          "name": "userStakeAccountFive",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "user_configs.get(4)"
              }
            ]
          }
        },
        {
          "name": "userStakeAccountSix",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "user_configs.get(5)"
              }
            ]
          }
        },
        {
          "name": "userStakeAccountSeven",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "user_configs.get(6)"
              }
            ]
          }
        },
        {
          "name": "userStakeAccountEight",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "user_configs.get(7)"
              }
            ]
          }
        },
        {
          "name": "userStakeAccountNine",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "user_configs.get(8)"
              }
            ]
          }
        },
        {
          "name": "userStakeAccountTen",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "user_configs.get(9)"
              }
            ]
          }
        },
        {
          "name": "userStakeAccountEleven",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "user_configs.get(10)"
              }
            ]
          }
        },
        {
          "name": "userStakeAccountTwelve",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "user_configs.get(11)"
              }
            ]
          }
        },
        {
          "name": "adminAcc",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "adminSign",
          "docs": [
            "Signer of the Admin Key"
          ],
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "stakingStatsAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  115,
                  116,
                  97,
                  116,
                  115
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "userConfigs",
          "type": {
            "vec": {
              "defined": {
                "name": "userStakeConfiguration"
              }
            }
          }
        },
        {
          "name": "stakingStartTime",
          "type": "i64"
        }
      ]
    },
    {
      "name": "changeApr",
      "discriminator": [
        167,
        33,
        18,
        234,
        116,
        85,
        32,
        198
      ],
      "accounts": [
        {
          "name": "adminSign",
          "docs": [
            "Signer of the Admin Key"
          ],
          "signer": true
        },
        {
          "name": "adminAcc",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "stakingConfigAccount",
          "docs": [
            "Configuration Account PDA"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  105,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "newApr",
          "type": "u16"
        }
      ]
    },
    {
      "name": "changeExitFee",
      "discriminator": [
        187,
        177,
        61,
        133,
        162,
        160,
        159,
        18
      ],
      "accounts": [
        {
          "name": "adminSign",
          "docs": [
            "Signer of the Admin Key"
          ],
          "signer": true
        },
        {
          "name": "adminAcc",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "stakingConfigAccount",
          "docs": [
            "Configuration Account PDA"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  105,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "newExitFeePercentage",
          "type": "u16"
        }
      ]
    },
    {
      "name": "changeMinimumLockinPeriod",
      "discriminator": [
        119,
        81,
        31,
        47,
        213,
        129,
        223,
        2
      ],
      "accounts": [
        {
          "name": "adminSign",
          "docs": [
            "Signer of the Admin Key"
          ],
          "signer": true
        },
        {
          "name": "adminAcc",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "stakingConfigAccount",
          "docs": [
            "Configuration Account PDA"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  105,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "multiplierAcc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  112,
                  108,
                  105,
                  101,
                  114,
                  95,
                  97,
                  99,
                  99
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "newMinimumLockinPeriod",
          "type": "u32"
        },
        {
          "name": "newMultiplierForNewMinimumLockinPeriod",
          "type": {
            "option": "u8"
          }
        }
      ]
    },
    {
      "name": "changeMinimumStakeAmount",
      "discriminator": [
        146,
        189,
        91,
        94,
        92,
        149,
        229,
        198
      ],
      "accounts": [
        {
          "name": "adminSign",
          "docs": [
            "Signer of the Admin Key"
          ],
          "signer": true
        },
        {
          "name": "adminAcc",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "stakingConfigAccount",
          "docs": [
            "Configuration Account PDA"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  105,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "newMinimumStakeAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "changeOwner",
      "discriminator": [
        109,
        40,
        40,
        90,
        224,
        120,
        193,
        184
      ],
      "accounts": [
        {
          "name": "adminSign",
          "docs": [
            "Signer of the Admin Key"
          ],
          "signer": true
        },
        {
          "name": "adminAcc",
          "docs": [
            "Configuration Account PDA"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "newOwner",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "closeMultiplierAcc",
      "discriminator": [
        118,
        6,
        92,
        173,
        204,
        107,
        183,
        198
      ],
      "accounts": [
        {
          "name": "receiver",
          "docs": [
            "CHECK : admix ix, admin signature is required in to validate the constraints"
          ],
          "writable": true
        },
        {
          "name": "adminSign",
          "docs": [
            "Signer of the Admin Key"
          ],
          "signer": true
        },
        {
          "name": "adminAcc",
          "docs": [
            "Configuration Account PDA",
            "admin_acc to close"
          ]
        },
        {
          "name": "multiplierAcc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  112,
                  108,
                  105,
                  101,
                  114,
                  95,
                  97,
                  99,
                  99
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createNewNftTier",
      "discriminator": [
        220,
        125,
        100,
        91,
        177,
        8,
        177,
        250
      ],
      "accounts": [
        {
          "name": "adminSign",
          "docs": [
            "Signer of the Admin Key"
          ],
          "signer": true
        },
        {
          "name": "adminAcc",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "docs": [
            "Funding Wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "nftTierDetailAcc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116,
                  95,
                  116,
                  105,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "tierNum"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "collection",
          "docs": [
            "The address of the new collection."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116,
                  95,
                  99,
                  111,
                  108,
                  108,
                  101,
                  99,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "arg",
                "path": "tierNum"
              }
            ]
          }
        },
        {
          "name": "taiAuthorityAcc",
          "docs": [
            "The authority on the new asset."
          ]
        },
        {
          "name": "mplCore",
          "docs": [
            "The MPL Core program."
          ],
          "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
        }
      ],
      "args": [
        {
          "name": "tierNum",
          "type": "u8"
        },
        {
          "name": "pointsCost",
          "type": "u64"
        },
        {
          "name": "emissionRate",
          "type": "u64"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "endProgram",
      "discriminator": [
        52,
        169,
        162,
        67,
        229,
        102,
        137,
        27
      ],
      "accounts": [
        {
          "name": "adminSign",
          "docs": [
            "Signer of the Admin Key"
          ],
          "signer": true
        },
        {
          "name": "adminAcc",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "stakingConfigAccount",
          "docs": [
            "Configuration Account PDA"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  105,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "increaseMultiplierConfigSpace",
      "discriminator": [
        224,
        84,
        184,
        74,
        41,
        34,
        33,
        124
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "adminSign",
          "docs": [
            "Signer of the Admin Key"
          ],
          "signer": true
        },
        {
          "name": "adminAcc",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "multiplierAcc",
          "docs": [
            "Configuration Account PDA"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  112,
                  108,
                  105,
                  101,
                  114,
                  95,
                  97,
                  99,
                  99
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "increaseStakeOrLockin",
      "discriminator": [
        117,
        20,
        34,
        254,
        195,
        121,
        10,
        4
      ],
      "accounts": [
        {
          "name": "stakingConfigAccount",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  105,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "userStakeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "userAuthoritySigner"
              }
            ]
          }
        },
        {
          "name": "userAuthoritySigner",
          "signer": true
        },
        {
          "name": "userTaiTokenAcc",
          "writable": true
        },
        {
          "name": "taiProgramVaultAcc",
          "writable": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "stakingStatsAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  115,
                  116,
                  97,
                  116,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "multiplierAcc",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  112,
                  108,
                  105,
                  101,
                  114,
                  95,
                  97,
                  99,
                  99
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "stakeAmount",
          "type": "u64"
        },
        {
          "name": "lockinPeriod",
          "type": {
            "option": "u32"
          }
        }
      ],
      "returns": "u64"
    },
    {
      "name": "increaseStakingConfigAccountSpace",
      "discriminator": [
        129,
        199,
        87,
        132,
        163,
        102,
        165,
        130
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "adminSign",
          "docs": [
            "Signer of the Admin Key"
          ],
          "signer": true
        },
        {
          "name": "adminAcc",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "stakingConfigAccount",
          "docs": [
            "Configuration Account PDA"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  105,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "payer",
          "docs": [
            "Funding Wallet"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "stakingStatsAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  115,
                  116,
                  97,
                  116,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "stakingConfigAccount",
          "docs": [
            "Configuration Account PDA"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  105,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "initialAdmin",
          "signer": true,
          "address": "i3h765SS3M2KvWkdniVWaMjexJQb1EN6WkbqiuepDvE"
        },
        {
          "name": "taiAuthorityAcc",
          "docs": [
            "CHECK : Checked via a validated onchain state acc"
          ],
          "writable": true,
          "address": "86nHLn1LsqR1QdzvktoTiXQkVhpVhxrBQ8o4i8j5JWZ1"
        },
        {
          "name": "taiProgramVaultAcc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  105,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "taiMint"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "adminAcc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "adminKey",
          "type": "pubkey"
        },
        {
          "name": "stakingConfigSettings",
          "type": {
            "defined": {
              "name": "stakingConfigurationSettings"
            }
          }
        }
      ]
    },
    {
      "name": "initializeMultipliers",
      "discriminator": [
        117,
        76,
        198,
        0,
        199,
        175,
        69,
        52
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "adminSign",
          "docs": [
            "Signer of the Admin Key"
          ],
          "signer": true
        },
        {
          "name": "adminAcc",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "multiplierAcc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  112,
                  108,
                  105,
                  101,
                  114,
                  95,
                  97,
                  99,
                  99
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "stakingConfigAccount",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  105,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "multiplierRecord",
          "type": {
            "vec": {
              "defined": {
                "name": "multiplierRecord"
              }
            }
          }
        }
      ]
    },
    {
      "name": "modifyNftTierDetails",
      "discriminator": [
        137,
        180,
        67,
        123,
        84,
        202,
        234,
        221
      ],
      "accounts": [
        {
          "name": "adminSign",
          "docs": [
            "Signer of the Admin Key"
          ],
          "signer": true
        },
        {
          "name": "adminAcc",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "nftTierDetailAcc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116,
                  95,
                  116,
                  105,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "tierNum"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "tierNum",
          "type": "u8"
        },
        {
          "name": "pointsCost",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "emissionRate",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "redeemNft",
      "discriminator": [
        113,
        9,
        91,
        16,
        166,
        235,
        118,
        133
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "stakingConfigAccount",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  105,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "userStakeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "userAuthoritySigner"
              }
            ]
          }
        },
        {
          "name": "userAuthoritySigner",
          "signer": true
        },
        {
          "name": "taiAuthorityAcc",
          "docs": [
            "CHECK : Checked via a validated onchain state acc"
          ]
        },
        {
          "name": "stakingStatsAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  115,
                  116,
                  97,
                  116,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "multiplierAcc",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  112,
                  108,
                  105,
                  101,
                  114,
                  95,
                  97,
                  99,
                  99
                ]
              }
            ]
          }
        },
        {
          "name": "nftTierAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116,
                  95,
                  116,
                  105,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "nftTier"
              }
            ]
          }
        },
        {
          "name": "userNftTierTracker",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116,
                  95,
                  116,
                  105,
                  101,
                  114,
                  95,
                  105,
                  110,
                  100,
                  101,
                  120,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "user_stake_account.user_key",
                "account": "userStakeInfo"
              },
              {
                "kind": "arg",
                "path": "nftTier"
              }
            ]
          }
        },
        {
          "name": "userNftTimestampTracker",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  110,
                  102,
                  116,
                  95,
                  116,
                  105,
                  109,
                  101,
                  115,
                  116,
                  97,
                  109,
                  112,
                  95,
                  116,
                  114,
                  97,
                  99,
                  107,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "user_stake_account.user_key",
                "account": "userStakeInfo"
              },
              {
                "kind": "arg",
                "path": "nftTier"
              },
              {
                "kind": "account",
                "path": "userNftTierTracker"
              }
            ]
          }
        },
        {
          "name": "asset",
          "docs": [
            "CHECK : The address of the new nft asset., checked via pda",
            "seed : static asset seed + user stake account owner + nft tier"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116,
                  95,
                  97,
                  115,
                  115,
                  101,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "user_stake_account.user_key",
                "account": "userStakeInfo"
              },
              {
                "kind": "arg",
                "path": "nftTier"
              },
              {
                "kind": "account",
                "path": "userNftTierTracker"
              }
            ]
          }
        },
        {
          "name": "collection",
          "docs": [
            "The collection to which the asset belongs."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116,
                  95,
                  99,
                  111,
                  108,
                  108,
                  101,
                  99,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "nft_tier_account.nft_tier",
                "account": "nftTierDetails"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "The system program."
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "logWrapper",
          "docs": [
            "The SPL Noop program."
          ],
          "optional": true
        },
        {
          "name": "mplCore",
          "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
        }
      ],
      "args": [
        {
          "name": "tierNum",
          "type": "u8"
        }
      ]
    },
    {
      "name": "removeMultiplierRecord",
      "discriminator": [
        179,
        126,
        85,
        129,
        17,
        247,
        197,
        24
      ],
      "accounts": [
        {
          "name": "adminSign",
          "docs": [
            "Signer of the Admin Key"
          ],
          "signer": true
        },
        {
          "name": "adminAcc",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "multiplierAcc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  112,
                  108,
                  105,
                  101,
                  114,
                  95,
                  97,
                  99,
                  99
                ]
              }
            ]
          }
        },
        {
          "name": "stakingConfigAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  105,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "multiplierRecordToRemove",
          "type": {
            "defined": {
              "name": "multiplierRecord"
            }
          }
        }
      ]
    },
    {
      "name": "stake",
      "discriminator": [
        206,
        176,
        202,
        18,
        200,
        209,
        179,
        108
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "stakingConfigAccount",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  105,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "userStakeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "userAddr"
              }
            ]
          }
        },
        {
          "name": "userAuthoritySigner",
          "signer": true,
          "optional": true
        },
        {
          "name": "userTaiTokenAcc",
          "writable": true
        },
        {
          "name": "taiProgramVaultAcc",
          "writable": true
        },
        {
          "name": "stakingStatsAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  115,
                  116,
                  97,
                  116,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": [
        {
          "name": "stakeAmount",
          "type": "u64"
        },
        {
          "name": "userAddr",
          "type": "pubkey"
        },
        {
          "name": "lockinPeriod",
          "type": "u32"
        }
      ]
    },
    {
      "name": "tweakMultiplierRecord",
      "discriminator": [
        218,
        167,
        83,
        224,
        250,
        113,
        253,
        115
      ],
      "accounts": [
        {
          "name": "adminSign",
          "docs": [
            "Signer of the Admin Key"
          ],
          "signer": true
        },
        {
          "name": "adminAcc",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "multiplierAcc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  112,
                  108,
                  105,
                  101,
                  114,
                  95,
                  97,
                  99,
                  99
                ]
              }
            ]
          }
        },
        {
          "name": "stakingConfigAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  105,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "newMultiplierRecord",
          "type": {
            "defined": {
              "name": "multiplierRecord"
            }
          }
        },
        {
          "name": "oldMultiplier",
          "type": "u8"
        }
      ]
    },
    {
      "name": "unstake",
      "discriminator": [
        90,
        95,
        107,
        42,
        205,
        124,
        50,
        225
      ],
      "accounts": [
        {
          "name": "stakingConfigAccount",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  97,
                  105,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "userStakeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "userAuthoritySigner"
              }
            ]
          }
        },
        {
          "name": "userAuthoritySigner",
          "signer": true
        },
        {
          "name": "userTaiTokenAcc",
          "writable": true
        },
        {
          "name": "taiAuthorityAcc",
          "docs": [
            "CHECK : Checked via a validated onchain state acc"
          ]
        },
        {
          "name": "taiProgramVaultAcc",
          "writable": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "stakingStatsAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  115,
                  116,
                  97,
                  116,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "multiplierAcc",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  117,
                  108,
                  116,
                  105,
                  112,
                  108,
                  105,
                  101,
                  114,
                  95,
                  97,
                  99,
                  99
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "unstakeAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawExitFees",
      "discriminator": [
        228,
        124,
        153,
        89,
        129,
        74,
        128,
        230
      ],
      "accounts": [
        {
          "name": "taiAuthorityAcc",
          "docs": [
            "Configuration Account PDA",
            "CHECK : Checked via a validated onchain state acc"
          ]
        },
        {
          "name": "taiProgramVaultAcc",
          "writable": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "adminExitFeeReceiveTokenAccount",
          "writable": true
        },
        {
          "name": "adminSign",
          "docs": [
            "Signer of the Admin Key"
          ],
          "signer": true
        },
        {
          "name": "adminAcc",
          "docs": [
            "Configuration Account PDA"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "stakingStatsAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  115,
                  116,
                  97,
                  116,
                  115
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "withdrawAmount",
          "type": {
            "option": "u64"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "adminSettings",
      "discriminator": [
        72,
        250,
        196,
        91,
        93,
        154,
        17,
        15
      ]
    },
    {
      "name": "multiplierConfig",
      "discriminator": [
        181,
        92,
        4,
        234,
        240,
        56,
        88,
        127
      ]
    },
    {
      "name": "nftTierDetails",
      "discriminator": [
        119,
        1,
        234,
        116,
        162,
        215,
        18,
        96
      ]
    },
    {
      "name": "stakingConfiguration",
      "discriminator": [
        42,
        151,
        207,
        209,
        7,
        27,
        30,
        227
      ]
    },
    {
      "name": "stakingStats",
      "discriminator": [
        166,
        5,
        189,
        163,
        53,
        97,
        113,
        241
      ]
    },
    {
      "name": "userNftTierTracker",
      "discriminator": [
        226,
        114,
        148,
        147,
        153,
        109,
        48,
        147
      ]
    },
    {
      "name": "userNftTimeStampTracker",
      "discriminator": [
        19,
        215,
        247,
        54,
        1,
        69,
        75,
        166
      ]
    },
    {
      "name": "userStakeInfo",
      "discriminator": [
        219,
        233,
        236,
        123,
        28,
        113,
        89,
        56
      ]
    }
  ],
  "types": [
    {
      "name": "adminSettings",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "adminKey",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "aprChangeRecord",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "aprChangeTimestamp",
            "type": "i64"
          },
          {
            "name": "newApr",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "multiplierConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "multiplierRecords",
            "type": {
              "vec": {
                "defined": {
                  "name": "multiplierRecord"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "multiplierRecord",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "minimumLockinPeriod",
            "type": "u32"
          },
          {
            "name": "multiplier",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "nftTierDetails",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "nftTier",
            "type": "u8"
          },
          {
            "name": "pointsCost",
            "type": "u64"
          },
          {
            "name": "emissionRate",
            "type": "u64"
          },
          {
            "name": "nftCount",
            "type": "u32"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "onClaim",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "costOfNft",
            "type": "u64"
          },
          {
            "name": "nftCollectionAddr",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "onExitFeesWithdraw",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "exitFeeWithdrawed",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "onRestake",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "additionalStakeAmount",
            "type": "u64"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "lockinPeriod",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "onStake",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stakeAmount",
            "type": "u64"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "lockinPeriod",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "onUnstake",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "unstakeAmount",
            "type": "u64"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "exitFee",
            "type": "u64"
          },
          {
            "name": "amountReleased",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "stakingConfiguration",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "minimumStakeAmount",
            "type": "u64"
          },
          {
            "name": "programStartTime",
            "type": "i64"
          },
          {
            "name": "minimumLockinPeriod",
            "type": "u32"
          },
          {
            "name": "exitFeePercentage",
            "type": "u16"
          },
          {
            "name": "endDate",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "apyChanges",
            "type": {
              "vec": {
                "defined": {
                  "name": "aprChangeRecord"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "stakingConfigurationSettings",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "minimumStakeAmount",
            "type": "u64"
          },
          {
            "name": "programStartTime",
            "type": "i64"
          },
          {
            "name": "minimumLockinPeriod",
            "type": "u32"
          },
          {
            "name": "exitFeePercentage",
            "type": "u16"
          },
          {
            "name": "newApr",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "stakingStats",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "accumulatedExitFees",
            "type": "u64"
          },
          {
            "name": "totalStakeAmount",
            "type": "u64"
          },
          {
            "name": "totalUsers",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "userNftTierTracker",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "nftsMinted",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "userNftTimeStampTracker",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "timeStampMintedAt",
            "type": {
              "vec": "i64"
            }
          }
        ]
      }
    },
    {
      "name": "userStakeConfiguration",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userAddr",
            "type": "pubkey"
          },
          {
            "name": "stakeAmount",
            "type": "u64"
          },
          {
            "name": "lockinPeriod",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "userStakeInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userKey",
            "type": "pubkey"
          },
          {
            "name": "stakeAmount",
            "type": "u64"
          },
          {
            "name": "lastSynced",
            "type": "i64"
          },
          {
            "name": "totalPoints",
            "type": "u64"
          },
          {
            "name": "lockinPeriod",
            "type": "u32"
          },
          {
            "name": "currentApr",
            "type": "u16"
          },
          {
            "name": "stakingStartTimestamp",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
