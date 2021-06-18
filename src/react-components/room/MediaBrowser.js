import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./MediaBrowser.scss";
import { ReactComponent as SearchIcon } from "../icons/Search.svg";
import { ReactComponent as StarIcon } from "../icons/Star.svg";
import { ReactComponent as CloseIcon } from "../icons/Close.svg";
import { ReactComponent as ArrowForwardIcon } from "../icons/ArrowForward.svg";
import { ReactComponent as ArrowBackIcon } from "../icons/ArrowBack.svg";
import { FormattedMessage, defineMessages, useIntl } from "react-intl";
import { TextInputField } from "../input/TextInputField";
import { IconButton } from "../input/IconButton";
import { FullscreenLayout } from "../layout/FullscreenLayout";
import { Button } from "../input/Button";
import { Column } from "../layout/Column";
import { MediaGrid } from "./MediaGrid";

const navTitleMessages = defineMessages({
  youtube: { id: "media-browser.nav_title.youtube", defaultMessage: "YouTube" },
  videos: { id: "media-browser.nav_title.videos", defaultMessage: "Videos" },
  images: { id: "media-browser.nav_title.images", defaultMessage: "Images" },
  gifs: { id: "media-browser.nav_title.gifs", defaultMessage: "GIFs" },
  scenes: { id: "media-browser.nav_title.scenes", defaultMessage: "Scenes" },
  avatars: { id: "media-browser.nav_title.avatars", defaultMessage: "Avatars" },
  sketchfab: { id: "media-browser.nav_title.sketchfab", defaultMessage: "Sketchfab" },
  poly: { id: "media-browser.nav_title.poly", defaultMessage: "Google Poly" },
  twitch: { id: "media-browser.nav_title.twitch", defaultMessage: "Twitch" },
  futureCity: { id: "media-browser.nav_title.future_city", defaultMessage: "Future City" },
  animals: { id: "media-browser.nav_title.animals", defaultMessage: "Animals" },
  natureAndPlants: { id: "media-browser.nav_title.nature_and_plants", defaultMessage: "Nature & Plants" },
  art: { id: "media-browser.nav_title.art", defaultMessage: "Art" },
  fashionAndStyle: { id: "media-browser.nav_title.fashion_and_style", defaultMessage: "Fashion & Style" },
  transportation: { id: "media-browser.nav_title.transportation", defaultMessage: "Transportation" },
  technology: { id: "media-browser.nav_title.technology", defaultMessage: "Technology" },
  foodAndDrink: { id: "media-browser.nav_title.food_and_drink", defaultMessage: "Food & Drink" },
  sports: { id: "media-browser.nav_title.sports", defaultMessage: "Sports" },
  fun: { id: "media-browser.nav_title.fun", defaultMessage: "Fun" },
  living: { id: "media-browser.nav_title.living", defaultMessage: "Living" },
  medicine: { id: "media-browser.nav_title.medicine", defaultMessage: "Medicine" }
});

export function MediaBrowser({
  onClose,
  browserRef,
  mediaSources,
  selectedSource,
  onSelectSource,
  activeFilter,
  facets,
  onSelectFacet,
  headerRight,
  hasNext,
  hasPrevious,
  onNextPage,
  onPreviousPage,
  noResultsMessage,
  children
}) {
  const intl = useIntl();

  return (
    <FullscreenLayout
      headerLeft={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
      headerRight={headerRight}
    >
      {mediaSources && (
        <div className={styles.buttonNav}>
          {mediaSources.map(source => (
            <Button
              sm
              key={source}
              preset={selectedSource === source ? "primary" : "transparent"}
              onClick={() => onSelectSource(source)}
            >
              {intl.formatMessage(navTitleMessages[source])}
            </Button>
          ))}
        </div>
      )}
      {facets && (
        <div className={classNames(styles.buttonNav, styles.facetsNav)}>
          {facets.map((facet, i) => (
            <Button
              sm
              key={i}
              preset={activeFilter === facet.params.filter ? "primary" : "transparent"}
              onClick={() => onSelectFacet(facet)}
            >
              {facet.text}
            </Button>
          ))}
        </div>
      )}
      <div className={styles.content}>
        <Column grow ref={browserRef}>
          {children ? (
            <MediaGrid
              isVariableWidth={selectedSource === "gifs" || selectedSource === "images"}
              sm={selectedSource === "avatars"}
            > 
            {children}
            </MediaGrid>
          ) : (
            <div className={styles.noResults}>{noResultsMessage}</div>
          )}
          {(hasNext || hasPrevious) && (
            <div className={styles.pager}>
              <button type="button" className={styles.pagerButton} disabled={!hasPrevious} onClick={onPreviousPage}>
                <ArrowBackIcon />
              </button>
              <button type="button" className={styles.pagerButton} disabled={!hasNext} onClick={onNextPage}>
                <ArrowForwardIcon />
              </button>
            </div>
          )}
        </Column>
      </div>
    </FullscreenLayout>
  );
}

MediaBrowser.propTypes = {
  onClose: PropTypes.func,
  browserRef: PropTypes.any,
  mediaSources: PropTypes.array,
  selectedSource: PropTypes.string,
  onSelectSource: PropTypes.func,
  activeFilter: PropTypes.string,
  facets: PropTypes.array,
  onSelectFacet: PropTypes.func,
  headerRight: PropTypes.node,
  hasNext: PropTypes.bool,
  hasPrevious: PropTypes.bool,
  onNextPage: PropTypes.func,
  onPreviousPage: PropTypes.func,
  noResultsMessage: PropTypes.node,
  children: PropTypes.node
};

MediaBrowser.defaultProps = {
  noResultsMessage: "No Results"
};
