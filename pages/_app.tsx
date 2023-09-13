import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { notificationProvider, RefineSnackbarProvider, ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/mui";
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier } from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";

import { Header } from "@components/header";
import { ColorModeContextProvider } from "@contexts";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import dataProvider from "@refinedev/simple-rest";
import { appWithTranslation, useTranslation } from "next-i18next";
import { authProvider } from "src/authProvider";
import { AppIcon } from "src/components/app-icon";

const API_URL = "https://api.fake-rest.refine.dev";
const KRAFT_API_URL = "http://localhost:3000/api/kraft";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
	const renderComponent = () => {
		if (Component.noLayout) {
			return <Component {...pageProps} />;
		}

		return (
			<ThemedLayoutV2 Header={() => <Header sticky />} Title={({ collapsed }) => <ThemedTitleV2 collapsed={collapsed} text="Kraft Lite" icon={<AppIcon />} />}>
				<Component {...pageProps} />
			</ThemedLayoutV2>
		);
	};

	const { t, i18n } = useTranslation();

	const i18nProvider = {
		translate: (key: string, params: object) => t(key, params),
		changeLocale: (lang: string) => i18n.changeLanguage(lang),
		getLocale: () => i18n.language,
	};

	return (
		<>
			{/* <GitHubBanner /> */}
			<RefineKbarProvider>
				<ColorModeContextProvider>
					<CssBaseline />
					<GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
					<RefineSnackbarProvider>
						<Refine
							routerProvider={routerProvider}
							dataProvider={{ default: dataProvider(API_URL), kraft: dataProvider(KRAFT_API_URL) }}
							notificationProvider={notificationProvider}
							authProvider={authProvider}
							i18nProvider={i18nProvider}
							resources={[
								{
									name: "templates",
									list: "/templates", // ? GET
									create: "/templates/create", // ? POST
									edit: "/templates/edit/:id", // ? PATCH
									show: "/templates/show/:id", // ? GET
									meta: {
										dataProviderName: "kraft",
										canDelete: true,
									},
								},
								{
									name: "blog_posts",
									list: "/blog-posts",
									create: "/blog-posts/create",
									edit: "/blog-posts/edit/:id",
									show: "/blog-posts/show/:id",
									meta: {
										canDelete: true,
									},
								},
								{
									name: "categories",
									list: "/categories",
									create: "/categories/create",
									edit: "/categories/edit/:id",
									show: "/categories/show/:id",
									meta: {
										canDelete: true,
									},
								},
							]}
							options={{
								syncWithLocation: true,
								warnWhenUnsavedChanges: true,
								projectId: "JrgTgx-L3fcs2-XN05FO",
							}}>
							{renderComponent()}
							<RefineKbar />
							<UnsavedChangesNotifier />
							<DocumentTitleHandler />
						</Refine>
					</RefineSnackbarProvider>
				</ColorModeContextProvider>
			</RefineKbarProvider>
		</>
	);
}

export default appWithTranslation(MyApp);
