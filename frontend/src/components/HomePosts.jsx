/* eslint-disable react/prop-types */
import * as React from 'react';
import {
  Card,
  CardHeader,
  CardPreview,
  Text,
  Image,
  tokens,
  makeStyles,
} from '@fluentui/react-components';
import { IF } from '../url';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '2rem',
    marginBottom:'2rem'
  },
  card: {
  display: 'flex',
  flexDirection: 'row',
  background:"white",
  borderRadius: tokens.borderRadiusMedium,
  boxShadow: tokens.shadow4,
  border: `1px solid ${tokens.colorNeutralStroke1}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease', // smooth transition
  cursor: 'pointer',

  // Hover effect
  ':hover': {
    transform: 'scale(1.03)', // zoom in a bit
    boxShadow: tokens.shadow8, // stronger shadow on hover
    border: `2px solid ${tokens.colorBrandStroke1}`, // optional: highlight border
  },
},

imageWrapper: {
  flexBasis: '35%',
  height: '200px',
  borderTopLeftRadius: tokens.borderRadiusMedium,
  borderBottomLeftRadius: tokens.borderRadiusMedium,
  overflow: 'hidden',
  padding: '20px', // Moved padding here instead of the image
  boxSizing: 'border-box',
},

image: {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block', // Removes any extra space below images
},

  content: {
    flexBasis: '65%',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  userInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    color: tokens.colorNeutralForeground3,
    fontSize: '0.875rem',
  },
  username: {
    fontWeight: '500',
  },
  
  postContent: {
    '& p': {
      margin: '0 0 1rem 0',
    },
    '& h1': {
      fontSize: '1rem',
    },
    '& h2': {
      fontSize: '1rem',
    },
    '& strong': {
      fontWeight: 'bold',
    },
    '& em': {
      fontStyle: 'italic',
    },
  },
});

const HomePosts = ({ post }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Card className={styles.card} appearance="outline">
        {/* Left - Image */}
        <CardPreview className={styles.imageWrapper}>
          <Image
            src={IF + post.photo}
            alt={post.title}
            className={styles.image}
          />
        </CardPreview>

        {/* Right - Content */}
        <div className={styles.content}>
          <CardHeader
            header={
              <Text weight="semibold" size={600}>
                {post.title}
              </Text>
            }
          />
          <div className={styles.userInfo}>
            <Text className={styles.username}>@{post.username}</Text>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Text>{new Date(post.updatedAt).toDateString()}</Text>
              <Text>{new Date(post.updatedAt).toTimeString().slice(0, 8)}</Text>
            </div>
          </div>
          <div className={styles.postContent}>
  <div
    dangerouslySetInnerHTML={{
      __html: post.desc.slice(0, 200) + '... <strong>Read more</strong>',
    }}
  />
</div>

        </div>
      </Card>
    </div>
  );
};

export default HomePosts;
