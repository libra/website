/**
 * Copyright (c) The Libra Core Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

export default props => {
  return (
    <Layout>
      <div className={styles.root}>
        <iframe
          className={styles.walletApp}
          src="https://staging.lrw.demo.firstdag.com/signup"
        />
      </div>
    </Layout>
  );
}

