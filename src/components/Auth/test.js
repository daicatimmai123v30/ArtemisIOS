FirebaseAppImpl {
    "automaticDataCollectionEnabled_": false,
    "container": ComponentContainer {
      "name": "[DEFAULT]",
      "providers": Map {
        "app" => Provider {
          "component": Component {
            "instanceFactory": [Function anonymous],
            "instantiationMode": "LAZY",
            "multipleInstances": false,
            "name": "app",
            "serviceProps": Object {},
            "type": "PUBLIC",
          },
          "container": [Circular],
          "instances": Map {
            "[DEFAULT]" => [Circular],
          },
          "instancesDeferred": Map {},
          "name": "app",
        },
        "platform-logger" => Provider {
          "component": Component {
            "instanceFactory": [Function anonymous],
            "instantiationMode": "LAZY",
            "multipleInstances": false,
            "name": "platform-logger",
            "serviceProps": Object {},
            "type": "PRIVATE",
          },
          "container": [Circular],
          "instances": Map {},
          "instancesDeferred": Map {},
          "name": "platform-logger",
        },
        "fire-core-rn-version" => Provider {
          "component": Component {
            "instanceFactory": [Function anonymous],
            "instantiationMode": "LAZY",
            "multipleInstances": false,
            "name": "fire-core-rn-version",
            "serviceProps": Object {},
            "type": "VERSION",
          },
          "container": [Circular],
          "instances": Map {},
          "instancesDeferred": Map {},
          "name": "fire-core-rn-version",
        },
        "fire-js-version" => Provider {
          "component": Component {
            "instanceFactory": [Function anonymous],
            "instantiationMode": "LAZY",
            "multipleInstances": false,
            "name": "fire-js-version",
            "serviceProps": Object {},
            "type": "VERSION",
          },
          "container": [Circular],
          "instances": Map {},
          "instancesDeferred": Map {},
          "name": "fire-js-version",
        },
        "auth" => Provider {
          "component": Object {
            "instanceFactory": [Function instanceFactory],
            "instantiationMode": "LAZY",
            "multipleInstances": false,
            "name": "auth",
            "serviceProps": Object {
              "ActionCodeInfo": Object {
                "Operation": Object {
                  "EMAIL_SIGNIN": "EMAIL_SIGNIN",
                  "PASSWORD_RESET": "PASSWORD_RESET",
                  "RECOVER_EMAIL": "RECOVER_EMAIL",
                  "REVERT_SECOND_FACTOR_ADDITION": "REVERT_SECOND_FACTOR_ADDITION",
                  "VERIFY_AND_CHANGE_EMAIL": "VERIFY_AND_CHANGE_EMAIL",
                  "VERIFY_EMAIL": "VERIFY_EMAIL",
                },
              },
              "ActionCodeURL": [Function d],
              "Auth": [Function En],
              "AuthCredential": [Function Bg],
              "EmailAuthProvider": [Function d],
              "Error": [Function t],
              "FacebookAuthProvider": [Function d],
              "GithubAuthProvider": [Function d],
              "GoogleAuthProvider": [Function d],
              "OAuthProvider": [Function d],
              "PhoneAuthProvider": [Function d],
              "PhoneMultiFactorGenerator": [Function d],
              "RecaptchaVerifier": [Function d],
              "SAMLAuthProvider": [Function d],
              "TwitterAuthProvider": [Function d],
            },
            "type": "PUBLIC",
          },
          "container": [Circular],
          "instances": Map {
            "[DEFAULT]" => Object {
              "apiKey": "AIzaSyBQ0qWwEeHFRAp0Reyrvy9bKGeaLYyrbis",
              "appName": "[DEFAULT]",
              "authDomain": "numberphone-65ab4.firebaseapp.com",
              "currentUser": null,
            },
          },
          "instancesDeferred": Map {},
          "name": "auth",
        },
        "auth-internal" => Provider {
          "component": Object {
            "instanceFactory": [Function instanceFactory],
            "instantiationMode": "LAZY",
            "multipleInstances": false,
            "name": "auth-internal",
            "type": "PRIVATE",
          },
          "container": [Circular],
          "instances": Map {},
          "instancesDeferred": Map {},
          "name": "auth-internal",
        },
        "fire-auth-version" => Provider {
          "component": Component {
            "instanceFactory": [Function anonymous],
            "instantiationMode": "LAZY",
            "multipleInstances": false,
            "name": "fire-auth-version",
            "serviceProps": Object {},
            "type": "VERSION",
          },
          "container": [Circular],
          "instances": Map {},
          "instancesDeferred": Map {},
          "name": "fire-auth-version",
        },
        "database" => Provider {
          "component": Component {
            "instanceFactory": [Function anonymous],
            "instantiationMode": "LAZY",
            "multipleInstances": true,
            "name": "database",
            "serviceProps": Object {
              "DataSnapshot": [Function DataSnapshot],
              "Database": [Function Database],
              "INTERNAL": Object {
                "dataUpdateCount": [Function dataUpdateCount],
                "forceLongPolling": [Function forceLongPolling],
                "forceWebSockets": [Function forceWebSockets],
                "initStandalone": [Function initStandalone],
                "interceptServerData": [Function interceptServerData],
                "isWebSocketsAvailable": [Function isWebSocketsAvailable],
                "setSecurityDebugCallback": [Function setSecurityDebugCallback],
                "stats": [Function stats],
                "statsIncrementCounter": [Function statsIncrementCounter],
              },
              "Query": [Function Query],
              "Reference": [Function Reference],
              "ServerValue": Object {
                "TIMESTAMP": Object {
                  ".sv": "timestamp",
                },
                "increment": [Function increment],
              },
              "TEST_ACCESS": Object {
                "ConnectionTarget": [Function RepoInfo],
                "DataConnection": [Function PersistentConnection],
                "RealTimeConnection": [Function Connection],
                "forceRestClient": [Function forceRestClient],
                "hijackHash": [Function hijackHash],
                "queryIdentifier": [Function queryIdentifier],
              },
              "enableLogging": [Function enableLogging],
            },
            "type": "PUBLIC",
          },
          "container": [Circular],
          "instances": Map {},
          "instancesDeferred": Map {},
          "name": "database",
        },
        "fire-rtdb-version" => Provider {
          "component": Component {
            "instanceFactory": [Function anonymous],
            "instantiationMode": "LAZY",
            "multipleInstances": false,
            "name": "fire-rtdb-version",
            "serviceProps": Object {},
            "type": "VERSION",
          },
          "container": [Circular],
          "instances": Map {},
          "instancesDeferred": Map {},
          "name": "fire-rtdb-version",
        },
        "storage" => Provider {
          "component": Component {
            "instanceFactory": [Function factory],
            "instantiationMode": "LAZY",
            "multipleInstances": true,
            "name": "storage",
            "serviceProps": Object {
              "Reference": [Function ReferenceCompat],
              "Storage": [Function StorageService],
              "StringFormat": Object {
                "BASE64": "base64",
                "BASE64URL": "base64url",
                "DATA_URL": "data_url",
                "RAW": "raw",
              },
              "TaskEvent": Object {
                "STATE_CHANGED": "state_changed",
              },
              "TaskState": Object {
                "CANCELED": "canceled",
                "ERROR": "error",
                "PAUSED": "paused",
                "RUNNING": "running",
                "SUCCESS": "success",
              },
            },
            "type": "PUBLIC",
          },
          "container": [Circular],
          "instances": Map {},
          "instancesDeferred": Map {},
          "name": "storage",
        },
        "fire-gcs-version" => Provider {
          "component": Component {
            "instanceFactory": [Function anonymous],
            "instantiationMode": "LAZY",
            "multipleInstances": false,
            "name": "fire-gcs-version",
            "serviceProps": Object {},
            "type": "VERSION",
          },
          "container": [Circular],
          "instances": Map {},
          "instancesDeferred": Map {},
          "name": "fire-gcs-version",
        },
        "firestore" => Provider {
          "component": Component {
            "instanceFactory": [Function anonymous],
            "instantiationMode": "LAZY",
            "multipleInstances": false,
            "name": "firestore",
            "serviceProps": Object {
              "Blob": [Function $],
              "CACHE_SIZE_UNLIMITED": -1,
              "CollectionReference": [Function sh],
              "DocumentReference": [Function zu],
              "DocumentSnapshot": [Function Xu],
              "FieldPath": [Function rh],
              "FieldValue": [Function oh],
              "Firestore": [Function Qu],
              "GeoPoint": [Function sa],
              "Query": [Function th],
              "QueryDocumentSnapshot": [Function Zu],
              "QuerySnapshot": [Function nh],
              "Timestamp": [Function H],
              "Transaction": [Function Wu],
              "WriteBatch": [Function Gu],
              "setLogLevel": [Function ju],
            },
            "type": "PUBLIC",
          },
          "container": [Circular],
          "instances": Map {},
          "instancesDeferred": Map {},
          "name": "firestore",
        },
        "fire-fst-version" => Provider {
          "component": Component {
            "instanceFactory": [Function anonymous],
            "instantiationMode": "LAZY",
            "multipleInstances": false,
            "name": "fire-fst-version",
            "serviceProps": Object {},
            "type": "VERSION",
          },
          "container": [Circu...(truncated to the first 10000 characters)

      
  